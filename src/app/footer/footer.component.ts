import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataService } from '../data.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(
    private library: FaIconLibrary,
    private dataService: DataService
  ) {
    library.addIconPacks(fas);
  }

  scrollFunction() {
    this.dataService.ScrollToTop();
  }
}
