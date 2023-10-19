import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFormat'
})
export class CustomFormatPipe implements PipeTransform {

  transform(inputNumber: number | null | undefined): string {
    if (inputNumber == null)
      return '';
    if (isNaN(inputNumber))
      return '';

    const separator = " "//space

    let decimalPart: string;
    let naturalPart: string;
    let number: string;
    const dotPosition = inputNumber.toString().indexOf('.');
    if (dotPosition != -1) {
      number = inputNumber.toFixed(2);
      decimalPart = number.substring(dotPosition);
      naturalPart = number.substring(0, dotPosition);
    }
    else {
      number = inputNumber.toFixed(0);
      decimalPart = "";
      naturalPart = number;
    }
    const startNumber = naturalPart.length % 3;

    let result = "";

    for (let i = 0; i < startNumber; i++) {
      result = result + naturalPart[i];
    }
    if (startNumber != 0) {
      result = result + separator;
    }

    let currentIndex = 0;
    for (let i = startNumber; i < naturalPart.length; i++) {
      const currentChar = naturalPart[i];
      result = result + currentChar;
      currentIndex++;
      if (currentIndex == 3 && i != naturalPart.length - 1) {
        result = result + separator;
        currentIndex = 0;
      }
    }
    return result.trim() + decimalPart;
  }

}
