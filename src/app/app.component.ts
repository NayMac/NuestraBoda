import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}
