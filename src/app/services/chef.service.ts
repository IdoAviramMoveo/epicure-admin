import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChef } from '../models/chef.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private apiUrl: string = environment.baseUrl + '/api/chefs';
  private adminUrl: string = environment.baseUrl + '/admin/chefs';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllChefs(): Observable<IChef[]> {
    return this.http.get<IChef[]>(this.apiUrl);
  }

  addChef(chefData: IChef): Observable<IChef> {
    return this.http.post<IChef>(this.adminUrl, chefData, {
      headers: this.getHeaders(),
    });
  }

  updateChef(id: string, chefData: IChef): Observable<IChef> {
    return this.http.put<IChef>(`${this.adminUrl}/${id}`, chefData, {
      headers: this.getHeaders(),
    });
  }

  deleteChef(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  setChefOfTheWeek(chefId: string): Observable<any> {
    return this.http.put(
      `${this.adminUrl}/set-chef-of-the-week/${chefId}`,
      {},
      { headers: this.getHeaders() }
    );
  }
}
