import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value?: number, format?: string): string {
    if (value === undefined) {
      return '';
    }

    let seconds = Math.floor(value / 1000);
    const hours = Math.floor(seconds / 3600);

    seconds -= 3600 * hours;
    const minutes = Math.floor(seconds / 60);

    seconds -= 60 * minutes;

    let result = '';

    if (format === 'short') {
      result = `${hours * 60 + minutes}:${('0' + seconds).slice(-2)}`;
    } else {
      if (hours) result += `${hours} hr `;
      if (minutes) result += `${minutes} min `;
      if (!hours) result += `${seconds} sec `;
    }

    return result;
  }
}
