import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isPlaying: boolean = false;

  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    const audioPlayer = document.getElementById(
      'audioPlayer'
    ) as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.addEventListener('play', () => (this.isPlaying = true));
      audioPlayer.addEventListener('pause', () => (this.isPlaying = false));
      audioPlayer.addEventListener('ended', () =>
        this.handleAudioEnded(audioPlayer)
      );
    }
  }

  playPauseAudio() {
    const audioPlayer = document.getElementById(
      'audioPlayer'
    ) as HTMLAudioElement;
    if (audioPlayer) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  }

  handleAudioEnded(audioPlayer: HTMLAudioElement) {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
  }
}
