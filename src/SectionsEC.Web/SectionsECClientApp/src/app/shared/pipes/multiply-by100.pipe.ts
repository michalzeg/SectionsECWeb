import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplyBy100'
})
export class MultiplyBy100Pipe implements PipeTransform {

  transform(value: number | null | undefined): number | null {
    if (!value){
      return null;
    }
    return value * 100;
  }

}
