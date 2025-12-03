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
    const regex = new RegExp(searchText, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }
  
    const replacedValue = value.replace(regex, "<mark>" + match + "</mark>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }

}
