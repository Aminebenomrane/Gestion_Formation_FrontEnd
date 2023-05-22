import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  
  isMenuOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  toggleMenu() {
    const subMenu = this.elementRef.nativeElement.querySelector('#subMenu');

    if (this.isMenuOpen) {
      this.renderer.removeClass(subMenu, 'open-menu');
    } else {
      this.renderer.addClass(subMenu, 'open-menu');
    }

    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit(): void {
  }

}
