import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('audioRef', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;
   played = false;

  constructor(private renderer: Renderer2) {}


  playAudio() {
    if (!this.played && this.audioElement) {
      const audio = this.audioElement.nativeElement;
      audio.src = 'assets/Musica/cancion.mp3';
      audio.play().catch(err => console.log('Error al reproducir audio:', err));
      this.played = true;
    }
  }

  ngAfterViewInit() {
    const audio = this.audioElement.nativeElement;

    const playHandler = () => {
      if (!this.played) {
        audio.src = 'assets/Musica/cancion.mp3';
        audio.play().catch(err => console.log('Error al reproducir audio:', err));
        this.played = true;

        // Remover listeners después de reproducir
        removeClick();
        removeTouch();
      }
    };

    const removeClick = this.renderer.listen('document', 'click', playHandler);
    const removeTouch = this.renderer.listen('document', 'touchstart', playHandler);
  }
}