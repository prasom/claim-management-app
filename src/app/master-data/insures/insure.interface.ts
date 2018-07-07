export interface InsureCreateModel {
    name: string;
    create_date: any;
    delete_flag: boolean;
}

export interface InsureViewmodel extends InsureCreateModel {
    insure_type_id: number;
}
