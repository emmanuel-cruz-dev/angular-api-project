import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  playAudio() {
    const audioPlayer = document.getElementById(
      'audioPlayer'
    ) as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.play();
    }
  }

  pauseAudio() {
    const audioPlayer = document.getElementById(
      'audioPlayer'
    ) as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.pause();
    }
  }
}
