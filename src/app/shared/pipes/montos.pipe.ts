import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
@Pipe({
    name: 'montos',
  })
  export class MontosPipe implements PipeTransform {
    transform(
        value: number,
        currencyCode: string = '$',
        display:
            | 'code'
            | 'symbol'
            | 'symbol-narrow'
            | string
            | boolean = 'symbol',
        digitsInfo: string = '3.2-2',
        locale: string = 'ars',
    ): string | null {
        return formatCurrency(
          value,
          locale,
          getCurrencySymbol(currencyCode, 'wide'),
          currencyCode,
          digitsInfo,
        );
    }
}
