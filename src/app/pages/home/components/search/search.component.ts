import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalsService } from '../../../../shared/services/signals.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private readonly signalsService = inject(SignalsService)

  searchValue:string = ""

  onSearchChange(value:string){
    this.signalsService.setNewText(value)
  }
}
