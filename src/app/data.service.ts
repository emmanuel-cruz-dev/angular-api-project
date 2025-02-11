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
  private characterName = 'https://rickandmortyapi.com/api/character/?name=';
  private characterStatus =
    'https://rickandmortyapi.com/api/character/?status=';

  constructor(private http: HttpClient) {}

  async getCharacters(name?: string, status?: string) {
    let url = `https://rickandmortyapi.com/api/character`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    return data.results;
  }

  public getData(num = this.pageNum): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${num}`);
  }

  public getEpisodes(num: number): Observable<any> {
    return this.http.get<any>(`${this.episodeUrl}/${num}`);
  }

  public searchCharacter(name: string): Observable<any> {
    return this.http.get<any>(`${this.characterName}${name}`);
  }

  public getCharacterStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.characterStatus}${status}`);
  }

  public ScrollToTop() {
    window.scrollTo(0, 0);
  }
}
