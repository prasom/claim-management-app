import { Injectable } from '@angular/core';
import { DbConnectService } from '../shared/db-connect.service';
import { Observable } from 'rxjs';
import { ClaimViewObject, ClaimInfoFullViewModel } from './claim.interface';

@Injectable()
export class ClaimService {
    /**
     *
     */
    constructor(
        private db: DbConnectService
    ) {
    }

    getClaimList(): Observable<any> {
        return new Observable(observ => {
            // tslint:disable-next-line:max-line-length
            let query = 'SELECT ci.*,it.name as insure_type_desc,ct.name as car_type_desc FROM claim_info ci left join insure_type it on ci.insure_ref_key = it.insure_type_id left join car_type ct on ci.car_type_id = ct.car_type_id';
            this.db.query(query).then(res => {
                observ.next(res);
            }).catch(ex => {
                observ.next(ex);
            });
        });
    }

    createClaim(parameters: any) {
        const query = 'INSERT INTO claim_info SET ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, parameters).then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            });
        });
    }

    getClaimById(id: any): Observable<ClaimInfoFullViewModel> {
        return new Observable(observ => {
            // tslint:disable-next-line:max-line-length
            let query = 'SELECT ci.*,it.name as insure_type_desc,ct.name as car_type_desc FROM claim_info ci left join insure_type it on ci.insure_ref_key = it.insure_type_id left join car_type ct on ci.car_type_id = ct.car_type_id WHERE ci.id = ?';
            this.db.queryWithParams(query, [id]).then(res => {
                observ.next(res[0]);
            }).catch(ex => {
                observ.next(ex);
            });
        });
    }

    updateClaimInfo(parameters: ClaimViewObject) {
        // tslint:disable-next-line:max-line-length
        const query = 'UPDATE claim_info SET contact_date = ?,insure_ref_key = ?,brand = ?,car_number = ?,customer_type = ?,service_level = ?,is_parking = ?,parking_date = ?,create_date = ?,update_date = ?,create_by = ?,car_type_id = ?,contact_tel = ?,car_type_other = ? WHERE id = ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, [parameters.contact_date,
            parameters.insure_ref_key,
            parameters.brand,
            parameters.car_number,
            parameters.customer_type,
            parameters.service_level,
            parameters.is_parking,
            parameters.parking_date,
            parameters.create_date,
            parameters.update_date,
            parameters.create_by,
            parameters.car_type_id,
            parameters.contact_tel,
            parameters.car_type_other,
            parameters.id]).then(res => {
                resolve(res);
            }).catch(ex => {
                console.log(ex);
                reject(ex);
            });
        });
    }

    updateBillStatus(status: number, id: number) {
        // tslint:disable-next-line:max-line-length
        const query = 'UPDATE claim_info SET bill_status = ? WHERE id = ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, [status, id]).then(res => {
                resolve(res);
            }).catch(ex => {
                console.log(ex);
                reject(ex);
            });
        });
    }

    updateParkingStatus(status: number, id: number) {
        // tslint:disable-next-line:max-line-length
        const query = 'UPDATE claim_info SET parking_status = ? WHERE id = ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, [status, id]).then(res => {
                resolve(res);
            }).catch(ex => {
                console.log(ex);
                reject(ex);
            });
        });
    }

}
