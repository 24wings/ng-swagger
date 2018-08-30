import { Pipe, PipeTransform } from '@angular/core';
/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizefirst
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalizefirst  }}
 *  fromats to: Daniel
*/
@Pipe({
    name: 'keyword'
})
export class KeywordPipe implements PipeTransform {
    transform(args: string[], keyword: string): string[] {
        if (!keyword) return args;
        else {
            console.log();

            return args.filter(key => new RegExp(keyword, 'gi').test(key));
        }
    }
}