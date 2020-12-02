import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'keepHtml'
})
export class KeepHtmlPipe implements PipeTransform {

  constructor(private sanititzer: DomSanitizer){}

  transform(content: string): any {
    return this.sanititzer.bypassSecurityTrustHtml(content);
  }
}
