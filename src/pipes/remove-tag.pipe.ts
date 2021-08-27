import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTag'
})
export class RemoveTagPipe implements PipeTransform {
  
  transform(value: string): string {
    const pattern = /<\/?[^>]+>/;
    return value.split(pattern).join('');
  }
}
