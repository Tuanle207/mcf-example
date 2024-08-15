import { TestBed } from '@angular/core/testing';
import { WirebreakListComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WirebreakListComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WirebreakListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'wirebreak-viewer-app' title`, () => {
    const fixture = TestBed.createComponent(WirebreakListComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('wirebreak-viewer-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WirebreakListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, wirebreak-viewer-app');
  });
});
