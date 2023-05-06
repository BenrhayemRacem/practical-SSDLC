import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML',

})
export class SafeHTMLPipe implements PipeTransform {

  constructor(private sanitized : DomSanitizer){}
  transform(value: string) {
    return this.sanitized.sanitize(SecurityContext.HTML, value);
  }

}
