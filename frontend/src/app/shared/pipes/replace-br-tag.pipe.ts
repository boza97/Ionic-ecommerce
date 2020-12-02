import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceBrTag'
})
export class ReplaceBrTagPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let [first, ...rest] = value.split("<br>");
    if (rest.length === 0) return first;
    else return `${first} ${rest.join(" ")}`;
  }
}
