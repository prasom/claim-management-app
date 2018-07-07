import { Pipe, PipeTransform } from '@angular/core';
import * as  moment from 'moment';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'dateTh' })
export class DateThPipe implements PipeTransform {
    transform(value: any): string {
        if (value) {
            // let date = moment(value).toDate();
            // tslint:disable-next-line:max-line-length
            return moment(value).format('DD/MM/YYYY');
            // tslint:disable-next-line:max-line-length
            // return date.getDay().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + '/' + date.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + '/' + (date.getFullYear() + 543).toString();
        } else {
            return value;
        }
    }
}

