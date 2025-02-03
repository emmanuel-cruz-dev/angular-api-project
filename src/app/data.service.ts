import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private episodeUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  public getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public getEpisodes(num: number): Observable<any> {
    console.log(this.http.get<any>(`${this.episodeUrl}/${num}`));
    return this.http.get<any>(`${this.episodeUrl}/${num}`);
  }
}
