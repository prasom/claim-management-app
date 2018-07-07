import { Injectable } from '@angular/core';
import { DbConnectService } from '../../shared/db-connect.service';
import { Observable } from 'rxjs';
import { CarTypeViewModel, CarTypeCreateModel } from './car-type.interface';

@Injectable()
export class CarTypeService {
    /**
     *
     */
    constructor(
        private db: DbConnectService
    ) {

    }

    getCarType(): Observable<CarTypeViewModel[]> {
        return new Observable(observe => {
            this.db.query('SELECT * FROM car_type').then(res => {
                observe.next(res);
            }).catch(ex => {
                observe.next(ex);
            });
        });
    }

    getCarTypeById(id: any): Observable<CarTypeViewModel> {
        return new Observable(observ => {
            this.db.queryWithParams('SELECT * FROM car_type WHERE car_type_id = ?', [id]).then(res => {
                observ.next(res[0]);
            }).catch(ex => {
                observ.next(ex);
            });
        });
    }

    createCarType(parameters: CarTypeCreateModel) {
        const query = 'INSERT INTO car_type SET ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, parameters).then(res => {
                resolve(res);
            }).catch(ex => {
                console.log(ex);
                reject(ex);
            });
        });
    }

    updateCarType(parameters: CarTypeViewModel) {
        const query = 'UPDATE car_type SET name = ? WHERE car_type_id = ?';
        return new Promise<any>((resolve, reject) => {
            this.db.exeNoneQuery(query, [parameters.name, parameters.car_type_id]).then(res => {
                resolve(res);
            }).catch(ex => {
                console.log(ex);
                reject(ex);
            });
        });
    }
}

