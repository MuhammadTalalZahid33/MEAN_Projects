import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
  pure: true
})
export class HighlightPipe implements PipeTransform {
 constructor(private sanitizer: DomSanitizer){}
  transform(value: any, searchText: any): any {
    if(!searchText){
      return value;
    }
    // console.log("search text: ", searchText);
    
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(' + escapeRegExp(searchText) + ')', 'gi');

    // USING MATCH customly for each value / NOT USING above regexp function  
    // const match = value.match(regex);
    // if (!match) {
    //   return value;
    // }
    // const replacedValue = value.replace(regex, "<mark>" + match[0] + "</mark>")
    
    const replacedValue = value.replace(regex, '<span style="background-color: yellow;">$1</span>')
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }

}
