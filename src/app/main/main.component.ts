import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-main',
  imports: [NgIf, NgFor, NgClass, FontAwesomeModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  data: any[] = [];
  episode: { [key: number]: string } = {};
  pages: number = 42;
  pageNumbers: number[] = [];

  constructor(public dataService: DataService, private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.fillData();
    this.generatePageNumbers();
  }

  fillData(num = this.dataService.pageNum) {
    this.dataService.getData(num).subscribe((data) => {
      this.data = data.results;
      this.preloadEpisodes();
    });
  }

  preloadEpisodes() {
    const episodeNumbers = new Set<number>();
    this.data.forEach((char) => {
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
    if (this.dataService.pageNum === 1) return;
    this.dataService.ScrollToTop();
    this.fillData((this.dataService.pageNum -= 1));
  }

  nextPage() {
    this.dataService.ScrollToTop();
    this.fillData((this.dataService.pageNum += 1));
  }

  pageSelector(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target ? target.value : '';
    const num = Number(value);
    this.dataService.pageNum = num;
    this.fillData(num);
  }

  searchCharacter() {
    const searchInput = document.getElementById(
      'search-character__input'
    ) as HTMLInputElement | null;

    if (!searchInput) return;

    try {
      const value = searchInput.value;

      this.dataService.searchCharacter(value).subscribe(
        (data) => {
          if (data.results && data.results.length > 0) {
            this.data = data.results;
            this.preloadEpisodes(); // Asegúrate de precargar los episodios si es necesario
          } else {
            console.error('Character not found');
            alert('Character name not found');
          }
        },
        (error) => {
          console.error('Character not found', error);
          alert('Character name not found');
        }
      );
    } catch (error) {
      console.error('Characer not found', error);
      alert('Character name not found');
    }
  }

  statusSelector(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target ? target.value : 'Alive';

    this.dataService.getCharacterStatus(value).subscribe((data) => {
      this.data = data.results;
      this.dataService.getCharacterStatus(value);
    });
  }

  generatePageNumbers() {
    this.pageNumbers = Array.from({ length: this.pages }, (_, i) => i + 1);
  }
}
