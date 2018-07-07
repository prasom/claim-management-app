
import { ClaimViewObject } from '../claim/claim.interface';

export interface ParkingHistoryViewModel extends ClaimViewObject {
    id_parking_history: number;
    claim_info_id: number;
    is_parking: boolean;
    create_date: any;
}

export interface ParkingHistoryRequestModel {
    claim_info_id: number;
    is_parking: boolean;
    create_date: any;
}

export interface ParkingHistoryFullViewModel extends ParkingHistoryViewModel {
    insure_type_desc: string;
    car_type_desc: string;
}

