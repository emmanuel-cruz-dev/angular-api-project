import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const container = document.querySelector('.container');

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

  // Inicio: Nueva Lógica

  async getCharacters(name?: string, status?: string) {
    let url = `https://rickandmortyapi.com/api/character/`;

    if (name || status) {
      url += '?';
      if (name) {
        url += `name=${name}&`;
      }
      if (status) {
        url += `status=${status}`;
      }
    }

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
  }

  async displayCharacters(
    container: HTMLElement,
    name?: string,
    status?: string
  ) {
    const characters = await this.getCharacters(name, status);

    container.innerHTML = '';
    return characters;

    // for (let character of characters) {
    //   const card = document.createElement('article');
    //   card.classList.add('character__container');
    //   card.innerHTML = `
    //     <div class="character__id-image__container">
    //       <span class="character__id__fill"></span>
    //       <span class="character__id" title="ID">#${character.id}</span>
    //       <img
    //         src="${character.image}"
    //         alt="Image of ${character.name}"
    //         width="300"
    //         height="300"
    //         title="${character.name}"
    //       />
    //     </div>
    //     <div class="character__info">
    //       <div>
    //         <p class="character__name" title="Name">${character.name}</p>
    //         <p class="character__data" title="Status">
    //           <span
    //             [ngClass]="{
    //               'status-alive': char.status === 'Alive',
    //               'status-dead': char.status === 'Dead',
    //               unknown: char.status !== 'Alive' && char.status !== 'Dead'
    //             }"
    //           >
    //             ${character.status}
    //           </span>
    //           -
    //           <span title="Species">${character.species}</span>
    //         </p>
    //       </div>

    //       <div>
    //         <p class="character__subtitle">Last known location:</p>
    //         <p>${character.location.name}</p>
    //       </div>
    //     </div>
    //   `;
    //   container.appendChild(card);
    // }
  }

  // Fin: Nueva Lógica

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
