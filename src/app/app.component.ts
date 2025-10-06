import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('audioRef', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;
  private played = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const audio = this.audioElement.nativeElement;

    const playHandler = () => {
      if (!this.played) {
        audio.src = 'assets/Musica/cancion.mp3';
        audio.play().catch(err => console.log('Error al reproducir audio:', err));
        this.played = true;

        // Remueve los listeners después del primer toque
        removeClick();
        removeTouch();
      }
    };

    const removeClick = this.renderer.listen('document', 'click', playHandler);
    const removeTouch = this.renderer.listen('document', 'touchstart', playHandler);
  }
}