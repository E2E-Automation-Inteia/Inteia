import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-instrumento',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './instrumento.component.html',
  styleUrl: './instrumento.component.css'
})
export class InstrumentoComponent {

}
