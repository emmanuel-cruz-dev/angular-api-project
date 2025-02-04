import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  datos: any[] = [];
  episode: { [key: number]: string } = {};

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.llenarDatos();
  }

  llenarDatos(num = this.dataService.pageNum) {
    this.dataService.getData(num).subscribe((data) => {
      this.datos = data.results;
      this.precargarEpisodios();
    });
  }

  precargarEpisodios() {
    const episodeNumbers = new Set<number>();
    this.datos.forEach((char) => {
      char.episode.forEach((url: string) => {
        const num = Number(url.slice(url.lastIndexOf('/') + 1));
        episodeNumbers.add(num);
      });
    });

    episodeNumbers.forEach((num) => {
      this.dataService.getEpisodes(num).subscribe((data) => {
        this.episode[num] = data.name;
      });
    });
  }

  getEpisodeNumber(url: string): string {
    const num = Number(url.slice(url.lastIndexOf('/') + 1));
    return this.episode[num] || 'Loading...';
  }

  prevPage() {
    console.log('Previous Page');
    if (this.dataService.pageNum === 1) return;
    this.scrollToTop();
    this.llenarDatos((this.dataService.pageNum -= 1));
  }

  nextPage() {
    console.log('Next Page');
    this.scrollToTop();
    this.llenarDatos((this.dataService.pageNum += 1));
  }

  pageSelector(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target ? target.value : '10';
    const num = Number(value);
    this.dataService.pageNum = num;
    this.llenarDatos(num);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  searchCharacter() {
    const searchInput = document.getElementById(
      'search-character__input'
    ) as HTMLInputElement | null;

    if (searchInput) {
      const value = searchInput.value;
      console.log(value);
      this.dataService.searchCharacter(value).subscribe((data) => {
        this.datos = data.results;
        this.precargarEpisodios(); // Asegúrate de precargar los episodios si es necesario
      });
    } else {
      console.error('Search input element not found');
    }
  }

  statusSelector(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target ? target.value : 'Alive';
    console.log(value);
    this.dataService.getCharacterStatus(value).subscribe((data) => {
      this.datos = data.results;
      this.dataService.getCharacterStatus(value);
    });
  }
}
