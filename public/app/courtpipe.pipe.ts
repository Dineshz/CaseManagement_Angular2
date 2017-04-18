import { Pipe, PipeTransform } from '@angular/core';
import { Court } from './court';

@Pipe({name: 'courtpipe'})

export class CourtPipe implements PipeTransform {

  transform(value: Court): any {
    if (!value) return [];

    return [1,2,3];

  }

}