import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShort',
  standalone: true
})
export class TextShortPipe implements PipeTransform {

  transform(value: string, maxLength:number = 10): string {
    return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
  }

}
