import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

}
