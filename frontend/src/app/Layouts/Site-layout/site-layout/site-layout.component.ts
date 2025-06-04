import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../Components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../../Components/footer/footer.component";
import { AdminHeaderComponent } from "../../../../Components/admin-header/admin-header.component";
import { AdminFooterComponent } from "../../../../Components/admin-footer/admin-footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, AdminHeaderComponent, AdminFooterComponent, CommonModule],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css'
})
export class SiteLayoutComponent {
  Role: string = '';

  ngOnInit() {
    this.Role = localStorage.getItem('role') || '';
  }
}
