import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brDate',
  standalone: true
})
export class BrDatePipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('pt-BR');
  transform(value: any, format: string = 'dd/MM/yyyy'): any {
    if(!value) return '';
    return this.datePipe.transform(value, format);
  }

}
