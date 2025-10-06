import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit  {
   
 @ViewChild('audioRef', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;
  private played = false; // para que solo se reproduzca una vez

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Crear listener global para click o touch
     let played = false;

  const audio = this.audioElement.nativeElement;

  // Listener para click
  const removeClickListener = this.renderer.listen('document', 'click', () => {
    if (!played) {
      audio.src = 'assets/musica/miCancion.mp3';
      audio.play().catch(err => console.log('Error al reproducir audio:', err));
      played = true;

      // Remueve listener después del primer toque
      removeClickListener();
      removeTouchListener();
    }
  });

  // Listener para touchstart (móviles)
  const removeTouchListener = this.renderer.listen('document', 'touchstart', () => {
    if (!played) {
      audio.src = 'assets/Musica/cancion.mp3';
      audio.play().catch(err => console.log('Error al reproducir audio:', err));
      played = true;

      // Remueve listener después del primer toque
      removeClickListener();
      removeTouchListener();
    }
  });
  }

  /*
  title = 'mi-invitacion';
   textoTransform: string = 'translateY(0px)';
  textoOpacity: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY;

    // Movimiento vertical proporcional
    this.textoTransform = `translateY(${scrollY * 0.5}px)`;

    // Opacidad del texto
    this.textoOpacity = Math.min(1, scrollY / 300);
  }
    */
}
