import { Injectable } from '@angular/core';
import { DbConnectService } from '../../shared/db-connect.service';
import { Observable } from 'rxjs';
import { InsureViewmodel } from './insure.interface';

@Injectable()
export class InsureService {
    /**
     *
     */
    constructor(
        private db: DbConnectService
    ) {

    }

    getInsure(): Observable<any> {
        return new Observable(observe => {
            this.db.query('SELECT * FROM insure_type').then(res => {
                observe.next(res);
            }).catch(ex => {
                observe.next(ex);
            });
        });
    }

    getInsureById(id: any): Observable<InsureViewmodel> {
        return new Observable(observ => {
            this.db.queryWithParams('SELECT * FROM insure_type WHERE insure_type_id = ?', [id]).then(res => {
                observ.next(res[0]);
            }).catch(ex => {
                observ.next(ex);
            });
        });
    }

    createInsure(parameters: any) {
        const query = 'INSERT INTO insure_type SET ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, parameters).then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            });
        });
    }

    updateInsure(parameters: InsureViewmodel) {
        const query = 'UPDATE insure_type SET name = ? WHERE insure_type_id = ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, [parameters.name, parameters.insure_type_id]).then(res => {
                resolve(res);
            }).catch(ex => {
                console.log(ex);
                reject(ex);
            });
        });
    }
}

