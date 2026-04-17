import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(value: number | null | undefined, discountPercent: number = 10): number | null {
    if (value == null || typeof value !== 'number') {
      return null;
    }
    return Math.round(value * (1 - discountPercent / 100));
  }
}

