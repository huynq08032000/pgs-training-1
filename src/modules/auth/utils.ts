import { ILoginParams, ILoginValidation, IRegisterParams } from "../../models/auth";
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

