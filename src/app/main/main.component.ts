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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.llenarDatos();
  }

  llenarDatos() {
    this.dataService.getData().subscribe((data) => {
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
  }

  nextPage() {
    console.log('Next Page');
  }
}
