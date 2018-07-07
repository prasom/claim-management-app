import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(value: any, search: any): any {
        debugger;
        let result = null;
        if (search) {
            if (value && value.indexOf(search) > -1) {
                result = value;
            }
        } else {
            result = value;
        }
        return result;
    }
}

