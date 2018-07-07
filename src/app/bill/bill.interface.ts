import { ClaimViewObject } from '../claim/claim.interface';

export interface BillViewModel extends BaseBillModel, ClaimViewObject {
    id_bill_history: number;
}

export interface BaseBillModel {
    claim_info_id: number;
    claim_no: string;
    amount: string;
    create_date: any;
}

export interface BillFullViewModel extends BillViewModel {
    insure_type_desc: string;
    car_type_desc: string;
}
