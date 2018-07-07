export interface ClaimCreateObject {
    contact_date: any;
    insure_ref_key: string;
    brand: string;
    car_number: string;
    customer_type: string;
    service_level: string;
    is_parking: boolean;
    parking_date: any;
    create_date: any;
    update_date: any;
    create_by: any;
    car_type_id: string;
    contact_tel: string;
    car_type_other: string;
}

export interface ClaimViewObject extends ClaimCreateObject {
    id: number;
}

export interface ClaimInfoFullViewModel extends ClaimViewObject {
    insure_type_desc: string;
    car_type_desc: string;
}

