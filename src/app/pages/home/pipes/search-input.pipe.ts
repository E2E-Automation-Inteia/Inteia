import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../interfaces/user.interface';

@Pipe({
  name: 'searchInput',
  standalone: true
})
export class SearchInputPipe implements PipeTransform {

  transform(value: User[], searchInput:string) {
    searchInput = searchInput ? searchInput.toLowerCase() : '';
    return searchInput ? value.filter(user => user.name.toLowerCase().includes(searchInput)) : value;
  }

}
