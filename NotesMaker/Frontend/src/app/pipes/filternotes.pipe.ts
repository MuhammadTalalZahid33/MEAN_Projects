import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filternotes',
  standalone: true
})
export class FilternotesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
