import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  isOpen: boolean = false

  constructor(private renderer: Renderer2) {}

  openMenu() {
    this.isOpen = true
    this.renderer.setStyle(document.body, 'overflow', 'hidden')
  }

  closeMenu() {
    this.isOpen = false
    this.renderer.setStyle(document.body, 'overflow', 'auto')
  }
}
