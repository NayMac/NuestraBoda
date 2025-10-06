import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit, OnDestroy {
  @ViewChild('audioRef', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;
   played = false;

    fechaEvento: Date = new Date('2026-01-30T05:00:00'); // Cambia a tu fecha
    dias: number = 0;
    horas: number = 0;
    minutos: number = 0;
    segundos: number = 0;
  
    private intervalId: any;
  
    ngOnInit(): void {
      this.actualizarContador();
      this.intervalId = setInterval(() => this.actualizarContador(), 1000);
    }
  
    ngOnDestroy(): void {
      clearInterval(this.intervalId);
    }
  
    actualizarContador() {
      const ahora = new Date().getTime();
      const evento = this.fechaEvento.getTime();
      const diferencia = evento - ahora;
  
      if (diferencia <= 0) {
        // Evento pasado
        this.dias = this.horas = this.minutos = this.segundos = 0;
      } else {
        this.dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        this.horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        this.segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
      }
    }
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