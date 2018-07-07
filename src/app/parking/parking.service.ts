import { Injectable } from '@angular/core';
import { DbConnectService } from '../shared/db-connect.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ParkingHistoryViewModel, ParkingHistoryFullViewModel } from './parking.interface';
@Injectable()
export class ParkingService {
    constructor(
        private db: DbConnectService
    ) {

    }

    getParkingList(parameters: any): Observable<ParkingHistoryFullViewModel[]> {
        // tslint:disable-next-line:no-debugger
        // tslint:disable-next-line:max-line-length
        const query = 'select ci.*,ph.*,it.name as insure_type_desc,ct.name as car_type_desc from claim_info ci left join parking_history ph on ci.id = ph.claim_info_id left join insure_type it on ci.insure_ref_key = it.insure_type_id left join car_type ct on ci.car_type_id = ct.car_type_id where parking_date = ?';
        let filterDate: any;
        if (parameters) {
            filterDate = parameters.format('YYYY-MM-DD');
        } else {
            filterDate = moment().format('YYYY-MM-DD');
        }
        return new Observable(observe => {
            this.db.queryWithParams(query, filterDate).then(res => {
                observe.next(res);
            }).catch(ex => {
                observe.error(ex);
            });
        });
    }

    getParkingDetail(id: any): Observable<ParkingHistoryFullViewModel> {
        // tslint:disable-next-line:no-debugger
        // tslint:disable-next-line:max-line-length
        const query = 'select ci.*,ph.*,it.name as insure_type_desc,ct.name as car_type_desc from claim_info ci left join parking_history ph on ci.id = ph.claim_info_id left join insure_type it on ci.insure_ref_key = it.insure_type_id left join car_type ct on ci.car_type_id = ct.car_type_id where ci.id = ?';
        return new Observable(observe => {
            this.db.queryWithParams(query, [id]).then(res => {
                observe.next(res[0]);
            }).catch(ex => {
                observe.error(ex);
            });
        });
    }

    createParking(parameters: any) {
        const query = 'INSERT INTO parking_history SET ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, parameters).then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            });
        });
    }
}
