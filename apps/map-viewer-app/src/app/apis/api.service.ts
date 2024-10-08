import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajectory } from './api.dto';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  getTracjectory(): Observable<Trajectory> {
    return this.httpClient.get<Trajectory>(`${environment.apiUrl}/api/trajectory`);
  }
}