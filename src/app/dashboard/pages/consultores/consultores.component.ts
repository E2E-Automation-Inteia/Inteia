import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-consultores',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './consultores.component.html',
  styleUrl: './consultores.component.css'
})
export class ConsultoresComponent {

}
