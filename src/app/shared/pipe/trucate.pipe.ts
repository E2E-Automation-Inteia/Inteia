import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trucate',
  standalone: true
})
export class TrucatePipe implements PipeTransform {

  transform(value: string, limit: number = 50, trail: string = '…'): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit) + trail : value;
  }
}
