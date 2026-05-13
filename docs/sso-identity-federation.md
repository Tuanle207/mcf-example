# Full SSO với Identity Federation trong Micro Frontend

> **Mục đích tài liệu:** Giải thích vấn đề, lý do chọn giải pháp, và cách hoạt động của kiến trúc xác thực trong hệ thống Micro Frontend (MFE) — dành cho toàn bộ thành viên trong team, bao gồm cả những người không trực tiếp viết code.

---

## 1. Kiến trúc tổng quan

Hệ thống được chia thành 3 Angular application chạy hoàn toàn độc lập:

```
┌─────────────────────────────────────────────────┐
│                  Shell (port 4000)               │
│           "Khung" chứa toàn bộ ứng dụng         │
│                                                  │
│   ┌─────────────────┐   ┌────────────────────┐  │
│   │  map-viewer-app  │   │ wirebreak-viewer-  │  │
│   │   (port 3000)    │   │   app (port 3001)  │  │
│   │    [iframe]      │   │      [iframe]      │  │
│   └─────────────────┘   └────────────────────┘  │
└─────────────────────────────────────────────────┘
```

Shell không "nhúng code" của các micro app vào — mà **nhúng bằng `<iframe>`**, giống như nhúng một trang web bên trong một trang web khác. Mỗi app hoàn toàn tự quản lý vòng đời, build, deploy của mình.

---

## 2. Mỗi app dùng Identity Provider khác nhau — vì sao?

| App | Identity Provider (IdP) | Lý do |
|---|---|---|
| `shell` | **Auth0** | IdP chính, nơi user đăng nhập lần đầu |
| `map-viewer-app` | **Auth0** (cùng tenant với shell) | Tái dụng session Auth0 — SSO tự nhiên |
| `wirebreak-viewer-app` | **Azure B2C** | Cần B2C-specific policy (custom claims, MFA riêng cho nhóm người dùng này) |

> Đây là thực tế phổ biến trong enterprise: các nhóm/domain khác nhau có thể dùng IdP khác nhau, nhưng user vẫn mong muốn chỉ đăng nhập **một lần duy nhất**.

---

## 3. Vấn đề: Tại sao authentication trong iframe lại khó?

### Vấn đề #1 — Login redirect phá vỡ giao diện

Cơ chế đăng nhập thông thường là **redirect**: ứng dụng chuyển hướng trình duyệt sang trang login của IdP, user đăng nhập xong, IdP chuyển hướng ngược lại.

Khi điều này xảy ra bên trong `<iframe>`:

```
Người dùng thấy:                    Thực tế xảy ra:

┌──────────────────┐                ┌──────────────────┐
│  Shell           │                │  Shell           │
│  ┌────────────┐  │                │  ┌────────────┐  │
│  │ map-viewer │  │   ──────►      │  │ auth0.com/ │  │
│  │  [iframe]  │  │                │  │   login    │  │
│  └────────────┘  │                │  └────────────┘  │
└──────────────────┘                └──────────────────┘
                                    Iframe bị "chiếm dụng"
                                    bởi trang login!
```

**Giải pháp:** Dùng **Popup** thay vì Redirect khi đang chạy trong iframe. Popup mở một cửa sổ mới, không ảnh hưởng đến iframe gốc.

---

### Vấn đề #2 — Trình duyệt chặn third-party cookie

Cách "silent authentication" truyền thống hoạt động như sau: IdP đặt một cookie vào trình duyệt khi user đăng nhập. Khi app khác cần xác thực, nó tạo một request ngầm đến IdP — IdP đọc cookie đó và tự động trả về token mà không cần hỏi lại user.

**Vấn đề:** Kể từ 2023–2024, các trình duyệt lớn (Chrome, Safari, Firefox) đều **chặn third-party cookie** theo mặc định. Cookie của Auth0/B2C không thể được đọc từ trong iframe của một domain khác.

```
Shell (localhost:4000) chứa iframe từ localhost:3000
  → Trình duyệt: "Cookie của auth0.com là third-party từ góc nhìn của iframe"
  → Trình duyệt: CHẶN
  → Silent auth thất bại
```

**Giải pháp:** Dùng **Refresh Token Rotation** — thay vì dựa vào cookie, SDK lưu một `refresh_token` trong **memory** của app. Khi cần token mới, SDK dùng refresh token đó gọi thẳng đến endpoint `/token` của IdP — không cần cookie.

---

### Vấn đề #3 — Làm sao SSO khi hai app dùng hai IdP khác nhau?

Đây là vấn đề lớn nhất. `map-viewer-app` dùng Auth0, `wirebreak-viewer-app` dùng B2C. Nếu không có giải pháp, user phải đăng nhập **3 lần**:

1. Đăng nhập vào Shell (Auth0)
2. Đăng nhập vào map-viewer (Auth0 khác app)
3. Đăng nhập vào wirebreak-viewer (Azure B2C)

**Giải pháp: Identity Federation**

---

## 4. Giải pháp: Identity Federation

### Khái niệm cốt lõi

> **Identity Federation** = Cấu hình để một IdP **tin tưởng** và **chấp nhận** identity từ một IdP khác.

Trong trường hợp này: **Azure B2C được cấu hình để tin tưởng Auth0**. Khi B2C cần xác thực user, thay vì tự hỏi thông tin đăng nhập, B2C chuyển tiếp yêu cầu sang Auth0. Nếu Auth0 đã có session → B2C tự động phát hành token của mình mà không hỏi lại user.

```
                        IDENTITY FEDERATION

   Auth0 ◄──────────────────────────────────────────┐
     │         "Tôi tin Auth0. Nếu Auth0 xác nhận   │
     │          user này, tôi cũng chấp nhận."       │
     │                                               │
     ▼                                            Azure B2C
  [Session]                                          │
     │                                               │
     └──── Auth0 xác nhận ──────────────────────────►│
                                                     │
                                              Phát hành B2C token
```

### Luồng SSO đầy đủ từ góc nhìn người dùng

```
Bước 1: User mở ứng dụng (shell - localhost:4000)
  └─► Chưa đăng nhập → chuyển sang trang Auth0 login
  └─► User nhập email/password một lần duy nhất
  └─► Quay lại shell, đã có session Auth0

Bước 2: Shell load map-viewer trong iframe
  └─► map-viewer kiểm tra: đã đăng nhập chưa? → Chưa
  └─► map-viewer dùng refresh token (Auth0, cùng tenant)
      gọi thầm lặng đến Auth0 → Auth0 nhận ra user
  └─► Trả token ngay, KHÔNG hỏi lại user
  └─► map-viewer hiển thị bản đồ bình thường ✓

Bước 3: Shell load wirebreak-viewer trong iframe
  └─► wirebreak-viewer kiểm tra: đã đăng nhập chưa? → Chưa
  └─► wirebreak-viewer gọi B2C (ssoSilent)
  └─► B2C kiểm tra với Auth0 (federation): Auth0 xác nhận session
  └─► B2C phát hành token B2C, KHÔNG hỏi lại user
  └─► wirebreak-viewer hiển thị danh sách wirebreak bình thường ✓

Kết quả: User chỉ đăng nhập 1 lần, 3 app đều có token hợp lệ.
```

---

## 5. Tại sao chọn kiến trúc này?

### So sánh các phương án

| Phương án | Mô tả | Vấn đề |
|---|---|---|
| **A. Shell relay token** | Shell đăng nhập, chia sẻ token với micro app qua `postMessage` | Bảo mật kém — token đi qua nhiều tầng; micro app phụ thuộc vào shell |
| **B. Mỗi app tự xác thực, không SSO** | Mỗi app login riêng, user nhập thông tin nhiều lần | Trải nghiệm người dùng rất tệ |
| **C. Full SSO với Federation** ✅ | Mỗi app tự xác thực, nhưng dùng chung session qua federation | Bảo mật cao, UX tốt, độc lập về deploy |

### Lý do chọn phương án C

- **Bảo mật:** Token không đi qua shell — mỗi app trực tiếp lấy token từ IdP của mình. Scope của từng app được kiểm soát riêng.
- **Độc lập:** Mỗi micro app có thể thay đổi IdP, cập nhật version, deploy riêng mà không ảnh hưởng đến app khác.
- **Trải nghiệm:** User chỉ đăng nhập một lần.
- **Thực tế:** Đây là pattern phổ biến trong hệ thống enterprise lớn (nhiều team, nhiều IdP, cần SSO).

---

## 6. Điều kiện để hệ thống hoạt động

### Phía Infrastructure (đã thực hiện)
- [x] Azure B2C đã cấu hình Auth0 là **External Identity Provider**
- [x] B2C policy `B2C_1_signupsigninflow` đã bao gồm bước federation với Auth0

### Phía Application (đã implement)
- [x] Shell: Auth0 với `useRefreshTokens: true`, token lưu trong memory
- [x] map-viewer: Auth0 (cùng tenant shell), logic phát hiện iframe → dùng popup/silent
- [x] wirebreak-viewer: MSAL + B2C, `ssoSilent` → fallback `loginPopup`
- [x] Tất cả app: không dùng `localStorage` cho token (tránh XSS)

### Phía Configuration (cần điền trước khi chạy)
- [ ] Điền `domain`, `clientId`, `audience` từ Auth0 Dashboard vào `environment.ts` của shell và map-viewer
- [ ] Đăng ký callback URL `http://localhost:3000` và `http://localhost:4000` trong Auth0

---

## 7. Những điểm cần lưu ý cho team

**Về token storage:** Token được lưu trong **memory** của từng app, không phải `localStorage`. Điều này có nghĩa là khi user **đóng tab/refresh trang**, họ sẽ cần đăng nhập lại — nhưng nhờ có session tại IdP và federation, quá trình này diễn ra **tự động và gần như tức thì** (không hiện form login lại).

**Về môi trường phát triển:** Các port phải đúng (`4000`, `3000`, `3001`) vì đã được đăng ký trong IdP. Thay đổi port cần cập nhật cả trong Auth0/B2C Dashboard.

**Về cross-origin iframe:** Các micro app không trực tiếp giao tiếp với nhau — tất cả message đi qua Shell bằng `postMessage`. Shell đóng vai trò **message broker**.

**Về B2C policy:** Policy `B2C_1_signupsigninflow` là trung tâm của wirebreak-viewer. Nếu cần thêm MFA hoặc custom attribute cho nhóm user này, chỉ cần chỉnh sửa policy ở B2C mà không cần thay đổi code app.

---

## 8. Sơ đồ kiến trúc tổng thể

```
                        USER
                          │
                          │ (1) Mở ứng dụng
                          ▼
              ┌─────────────────────┐
              │   Shell (Auth0)     │
              │   localhost:4000    │◄──── (2) Login một lần với Auth0
              └──────────┬──────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
  ┌─────────────────────┐  ┌─────────────────────┐
  │  map-viewer-app     │  │ wirebreak-viewer-app │
  │  (Auth0 - same      │  │  (Azure B2C)         │
  │   tenant as shell)  │  │                      │
  │  localhost:3000     │  │  localhost:3001       │
  └──────────┬──────────┘  └──────────┬───────────┘
             │                        │
             │ Silent token           │ ssoSilent → B2C
             │ (refresh token)        │         │
             ▼                        │         ▼
         Auth0                        │      Azure B2C
         (nhận ra session,            │      (federation
          trả token ngay)             │       với Auth0)
                                      │         │
                                      │         ▼
                                      │      Auth0
                                      │      (xác nhận session)
                                      │         │
                                      └─────────┘
                                      B2C phát hành token
```

---

*Tài liệu này phản ánh trạng thái implementation tại thời điểm May 2026. Cập nhật khi có thay đổi về IdP configuration hoặc kiến trúc.*
