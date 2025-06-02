import { Component } from '@angular/core';
import { FooterComponent } from '../../../../Components/footer/footer.component'
import { HeaderComponent } from '../../../../Components/header/header.component'
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

}
