import { ILoginParams, ILoginValidation, IRegisterParams } from "../../models/auth";
import { IPayrollDetail } from "../../models/data";
import { validEmailRegex } from "../../utils";

const validateEmail = (email : string) => {
    if (!email) return 'Vui lòng nhập địa chỉ email';
    if (!validEmailRegex.test(email)) return 'Địa chỉ email không hợp lệ';
    return '';
}

const validatePassword = (password : string) => {
    if (!password) return 'Vui lòng nhập mật khẩu';
    if (password.length < 4) return 'Mật khẩu tối thiểu 4 kí tự';
    return "";

}


const validateRepeatPassword = (password : string , repeatPassword : string) => {
    if (!repeatPassword) return 'Vui lòng nhập mật khẩu';
    if ( password !== repeatPassword ) return 'Xác nhận mật khẩu không khớp'
    return '';
}

const validateField = (field : string, value: string) => {
    if (value) return '';
    let messeage = '';
    switch (field){
        case 'name': 
            messeage = 'Vui lòng nhập tên'
            break;
        case 'gender': 
            messeage = 'Vui lòng giới tính'
            break;
        
        case 'region': 
            messeage = 'Vui lòng quốc gia'
            break;

        case 'state': 
            messeage = 'Vui lòng tiểu bang'
            break;
    }
    return messeage;
}

export const validateLogin = (value : ILoginParams) : ILoginValidation => {
    return{
        email : validateEmail(value.email),
        password: validatePassword(value.password)
    }
}
export const validLogin = (value: ILoginValidation) => {
    return !value.email && !value.password;
}

export const validateRegister = (value : IRegisterParams) : IRegisterParams => {
    return{
        email : validateEmail(value.email),
        password : validatePassword(value.password),
        repeatPassword : validateRepeatPassword(value.password, value.repeatPassword),
        name : validateField('name', value.name),
        gender : validateField('gender', value.gender),
        region : validateField('region', value.region),
        state : validateField('state',value.state)
        
    }
}

export const validRegister = (value:IRegisterParams) => {
    return !value.email && !value.password && !value.repeatPassword && !value.name 
            && !value.gender && !value.region && !value.state;
} 
export const getStatus = (payrollDetail: IPayrollDetail) => {
    let status = "";
    if(payrollDetail.time_created){
        status = "Pending"
    }
    if(payrollDetail.date_received){
        status = "Received"
        if(payrollDetail.date_matched){
            status = "Matched"
        }
    }
    if(payrollDetail.date_confirmed){
        status = "Processing"
        if (payrollDetail.fulfilled){
            status = "Fulfilled"
            if (payrollDetail.canceled){
                status = "Canceled"
            }
        }
    }
    return status;
}
export const getColor = (payrollDetail: IPayrollDetail) => {
    const status = getStatus(payrollDetail);
    let color = "black"
    switch (status) {
        case "Received":
            color = "blue"
            break;
        case "Canceled":
            color = "red"
            break; 
        case "Fulfilled":
            color = "blue"
            break; 
        case "Pending":
            color = "purple"
            break; 
        case "Processing":
            color = "orange"
            break;
        case "Matched":
            color = "green"
            break;
        default:
            break;
    }
    return color
}
export const getTotalPage = (total : any, itemPerPage : number) =>{
    if (total % itemPerPage != 0){
        return total / itemPerPage +1
    }
    if (total / itemPerPage == 0){
        return 1;
    }
}