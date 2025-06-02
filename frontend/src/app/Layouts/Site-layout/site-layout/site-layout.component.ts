import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../Components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../../Components/footer/footer.component";

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css'
})
export class SiteLayoutComponent {

}
