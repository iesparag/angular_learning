import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { ToasterComponent } from "./shared/components/toaster/toaster.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToasterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce';
  showLayout = true; // Default to showing layout

  constructor(private router: Router) {
    // Hide header and footer for specific routes
    this.router.events.subscribe(() => {
      const noLayoutRoutes = ['/login', '/signup'];
      this.showLayout = !noLayoutRoutes.includes(this.router.url);
    });
  }
}
