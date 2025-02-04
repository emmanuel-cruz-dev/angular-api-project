import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pageNum: number = 1;
  private apiUrl = `https://rickandmortyapi.com/api/character/?page=`;
  private episodeUrl = 'https://rickandmortyapi.com/api/episode';
  private characterStatus =
    'https://rickandmortyapi.com/api/character/?status=';

  constructor(private http: HttpClient) {}

  public getData(num = this.pageNum): Observable<any> {
    console.log(`${this.apiUrl}${num}`);
    return this.http.get<any>(`${this.apiUrl}${num}`);
  }

  public getEpisodes(num: number): Observable<any> {
    return this.http.get<any>(`${this.episodeUrl}/${num}`);
  }

  public getCharacterStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.characterStatus}${status}`);
  }
}
