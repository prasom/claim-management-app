export interface CarTypeCreateModel {
    name: string;
    create_date: any;
    delete_flag: boolean;
}

export interface CarTypeViewModel extends CarTypeCreateModel {
    car_type_id: number;
}
