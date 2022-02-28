import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IStatus {
    label : string,
    value : string,
}
export interface IPayroll{
    company_id: string;
    from_date: string|Date|null;
    meta: { curr_cursor: string, next_cursor: any },
    payrolls: Array<IPayrollDetail>,
    to_date: string|Date|null,
}
export interface IPayrollDetail{
    approved: boolean;
    canceled: boolean;
    company_id: string;
    confirmed: boolean;
    currency: string;
    date_canceled: string|Date|null;
    date_confirmed: string|Date|null;
    date_fulfilled: string|Date|null;
    date_matched: string|Date|null;
    date_processed: string|Date|null;
    date_received: string|Date|null;
    date_released: string|Date|null;
    fees: number;
    fulfilled: boolean;
    is_premium: boolean;
    matched: boolean;
    number_of_recipients: number;
    payment_type: string;
    payroll_id: string;
    received: boolean;
    released: boolean;
    subpayroll_ids: Array<string>;
    time_created: string|Date;
    volume_input_in_input_currency: number;
}
export interface IFilter {
    status : string;
    dateStart : Date;
    dateEnd : Date;
    payrollID : string;
}

export interface ISortIcon {
    name : string;
    icon : IconProp;
    reverse : number;
}