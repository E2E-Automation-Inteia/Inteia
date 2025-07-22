import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
