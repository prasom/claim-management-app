import { Injectable } from '@angular/core';
import { DbConnectService } from '../shared/db-connect.service';
import { Observable } from 'rxjs';
import { BillViewModel, BillFullViewModel } from './bill.interface';

@Injectable()
export class BillService {
    /**
     *
     */
    constructor(
        private db: DbConnectService
    ) {
    }

    getBills(): Observable<BillFullViewModel[]> {
        // tslint:disable-next-line:max-line-length
        const query = 'select ci.*,bh.*,it.name as insure_type_desc,ct.name as car_type_desc from claim_info ci inner join parking_history ph on ci.id = ph.claim_info_id left join bill_history bh on ci.id = bh.claim_info_id left join insure_type it on ci.insure_ref_key = it.insure_type_id left join car_type ct on ci.car_type_id = ct.car_type_id';
        return new Observable(observe => {
            this.db.query(query).then(res => {
                observe.next(res);
            }).catch(ex => {
                observe.error(ex);
            });
        });
    }

    getBill(id: any): Observable<BillFullViewModel> {
        // tslint:disable-next-line:no-debugger
        // tslint:disable-next-line:max-line-length
        const query = 'select ci.*,bh.*,it.name as insure_type_desc,ct.name as car_type_desc from claim_info ci inner join parking_history ph on ci.id = ph.claim_info_id left join bill_history bh on ci.id = bh.claim_info_id left join insure_type it on ci.insure_ref_key = it.insure_type_id left join car_type ct on ci.car_type_id = ct.car_type_id where ci.id = ?';
        return new Observable(observe => {
            this.db.queryWithParams(query, [id]).then(res => {
                observe.next(res[0]);
            }).catch(ex => {
                observe.error(ex);
            });
        });
    }

    createBill(parameters: any) {
        const query = 'INSERT INTO bill_history SET ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, parameters).then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            });
        });
    }

}
