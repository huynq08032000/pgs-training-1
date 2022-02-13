import React from 'react';
import {ILoginParams, ILoginValidation} from '../../../models/auth';
import { validateLogin, validLogin } from '../utils';
interface Props{
    onLogin(value : ILoginParams) : void,
    loading : boolean,
    errorMessage : string,
}

const LoginForm = (props : Props) => {
    const {onLogin, loading, errorMessage} = props
    const [formValues, setFormValues] = React.useState<ILoginParams>({email : '', password : '' , rememberMe : false});
    const [validate, setValidate] = React.useState<ILoginValidation>();
    const onSubmit = React.useCallback(() => {
        const validate = validateLogin(formValues);
        setValidate(validate);
        if(!validLogin(validate)){
            return;
        }
        onLogin(formValues)
    },[formValues,onLogin]); 
    return(
        <form 
            onSubmit={(e)=>{
                e.preventDefault();
                onSubmit();
            }}
            className='row g-3' style={{maxWidth : '560px', width : '100%'}}
            >
                {errorMessage && (
                <div className='alert alert-danger' style={{width : '100%'}}>
                    {errorMessage}
                </div>)}
            <div className="col-md-12">
                <label htmlFor="" className='form-label'>
                   Email
                </label>
                <input 
                type="text" 
                id="inputEmail" 
                className='form-control'
                onChange={(e)=>{
                    setFormValues({...formValues, email : e.target.value})
                }}
                /> 
                {validate?.email && (<small className='text-danger'>{validate.email}</small>)}
                
            </div>
            <div className="col-md-12" >
                <label htmlFor="" className='form-label'>
                Mật khẩu
                </label>
                <input 
                type="password" 
                id="inputPassword" 
                className='form-control'
                onChange={(e) => {
                    setFormValues({...formValues, password : e.target.value})
                }}
                />
                {validate?.password && (<small className='text-danger'>{validate.password}</small>)}
            </div>
            <div className="cod-12">
                <div className=''>
                <input 
                type="checkbox" 
                id="invalidCheck" 
                className='form-check-input'
                style={{marginRight: '10px'}}
                onChange={(e) => {
                    setFormValues({...formValues, rememberMe : e.target.checked})
                }}
                />
                <label htmlFor="" className='form-check-label'>
                    Lưu thông tin đăng nhập
                </label>
                </div>
            </div>
            <div className='cod-12'>
                <a href="/register">
                    Đăng kí
                </a>
            </div>
            <div className='row justify-content-md-center' style={{margin : '16px'}}>
                <div className='col-md-auto'>
                <button 
                    className='btn btn-primary' 
                    type='submit' style={{minWidth : '160px', display : 'flex', alignItems : 'center', justifyContent : 'center'}}
                    disabled = {loading}
                >
                    {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                    Đăng nhập
                </button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;