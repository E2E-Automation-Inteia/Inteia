import { Component } from '@angular/core';
import { BodyComponent } from "./components/body/body.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [BodyComponent, FooterComponent, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export default class LandingComponent {

}
