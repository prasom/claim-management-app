
import { Injectable } from '@angular/core';
const mysql = (<any>window).require('mysql');
// declare var mysql: any;
@Injectable()
export class DbConnectService {
  connection: any;
  constructor(

  ) {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin1234',
      database: 'claim_db'
    });
    this.connection.connect((err) => {
      if (err) {
        console.log('error connecting', err);
      }
    });
  }

  query(sql: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(sql, function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  queryWithParams(sql: string, parameters: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(sql, parameters, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  exeNoneQuery(sql: string, parameters: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(sql, parameters, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

}
