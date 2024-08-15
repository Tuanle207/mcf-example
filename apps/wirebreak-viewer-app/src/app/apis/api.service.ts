import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WireBreaks_ResultDto } from './api.dto';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  getWirebreaks(): Observable<WireBreaks_ResultDto> {
    return this.httpClient.get<WireBreaks_ResultDto>(`${environment.apiUrl}/api/wire-breaks`);
  }
}