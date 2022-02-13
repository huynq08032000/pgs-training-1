import React, { useEffect, useState } from 'react';
import {IRegisterParams, ILocationParams, IGenderParams} from '../../../models/auth';
import {validateRegister, validRegister} from '../utils'
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "typesafe-actions";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
interface Props{
    onRegister (value : IRegisterParams) : void;
    loading : boolean;
    errorMessage : string;
    locations : Array<ILocationParams>;
}

const RegisterForm = (props : Props) => {    
    const {onRegister,loading,errorMessage,locations} = props;
    const [formValues, setFormValues] = React.useState<IRegisterParams>(
        {email : '',password:'', repeatPassword : '', name : '', gender : '', region : '', state : ''});
    const [validate, setValidate] = React.useState<IRegisterParams>();
    const [states, setState] = React.useState([]);
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
    const GENDER: IGenderParams[] = [{label : 'Nam', value : 'male'},{label : 'Nữ', value : 'female'}];
    
    const getState = React.useCallback(
        async() => {
            if(formValues.region == '') return;
            const json = await dispatch(fetchThunk(API_PATHS.getState+formValues.region,'get'))
            if(json?.code == RESPONSE_STATUS_SUCCESS){
                setState(json.data)
                return;
            }
        },[formValues.region]
    )
    
    useEffect(()=>{
        getState() 
    },[formValues.region])
    const onSubmit = React.useCallback(()=>{
        const validate = validateRegister(formValues);
        setValidate(validate);
        if (!validRegister(validate)) { 
            return
        }
        onRegister(formValues);

    },[formValues,onRegister])
    const renderGender = () => {
        const arrGender : JSX.Element[] = [
            <option disabled selected value = '' key= ''>
                {'-- select an option --'}
            </option>
        ]
        GENDER.map((g:IGenderParams, index : number)=>{
            arrGender.push(
                <option value = {g.value} key= {index}>
                    {g.label}
                </option>
            )
        })
        return arrGender;
    }

    const renderRegion = () => {
        const arrRegion : JSX.Element[] = [
            <option disabled selected value={''} key=''>
                {'-- select an option --'}
            </option>
        ]
        locations.map((l : ILocationParams, index : number) => {
            arrRegion.push(
                <option value={l.id} key={index}>
                    {l.name}
                </option>
            )
        })
        return arrRegion;
    }

    const renderState = () => {
        const arrState : JSX.Element[] = [
            <option disabled selected value={''} key=''>
                {'-- select an option --'}
            </option>
        ]
        states.map((l : ILocationParams, index : number) => {
            arrState.push(
                <option value={l.id} key={index}>
                    {l.name}
                </option>
            )
        })
        return arrState;
    }

    return(
        <form 
            onSubmit={(e)=>{
                e.preventDefault();
                onSubmit();
            }}
            className='row g-3' 
            style={{maxWidth : '560px', width : '100%'}}
            autoComplete ='off'
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
                onChange={(e) => {
                    setFormValues({...formValues, email: e.target.value})
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
            <div className="col-md-12" >
                <label htmlFor="" className='form-label'>
                Xác nhận lại mật khẩu
                </label>
                <input 
                type="password" 
                id="inputRepeatPassword" 
                className='form-control'
                onChange={(e) => {
                    setFormValues({...formValues, repeatPassword : e.target.value})
                }}
                />
                {validate?.repeatPassword && (<small className='text-danger'>{validate.repeatPassword}</small>)}
            </div>
            <div className="col-md-12" >
                <label htmlFor="" className='form-label'>
                Họ và tên
                </label>
                <input 
                type="text" 
                id="inputName" 
                className='form-control'
                onChange={(e) => {
                    setFormValues({...formValues, name : e.target.value})
                }}
                />
                {validate?.name && (<small className='text-danger'>{validate.name}</small>)}
            </div>
            <div className="col-md-12" >
                <label htmlFor="" className='form-label'>
                Giới tính
                </label>
                <select 
                id="genderComboBox" 
                className="form-control"
                onChange={(e) => {
                    setFormValues({...formValues, gender : e.target.value});
                    
                }}
                >
                    {renderGender()}          
                </select>
                {validate?.gender && (<small className='text-danger'>{validate.gender}</small>)}
                
            </div>
            <div className="col-md-12" >
                <label htmlFor="" className='form-label'>
                Quốc gia 
                </label>
                <select 
                id="regionComboBox" 
                className="form-control"
                onChange={(e) => {
                    setFormValues({...formValues, region : e.target.value})
                }}
                >
                    {renderRegion()}
                </select>
                {validate?.region && (<small className='text-danger'>{validate.region}</small>)}
                
            </div>
            <div className="col-md-12" >
                <label htmlFor="" className='form-label'>
                Thành phố
                </label>
                <select 
                id="stateComboBox" 
                className="form-control"
                onChange={(e) => {
                    setFormValues({...formValues, state : e.target.value})
                }}
                >
                    {renderState()}
                </select>
                {validate?.state && (<small className='text-danger'>{validate.state}</small>)}
            </div>
            <div className='cod-12'>
                <a href="/login">
                    Đăng nhập
                </a>
            </div>
            <div className='row justify-content-md-center' style={{margin : '16px'}}>
                <div className='col-md-auto'>
                <button 
                    className='btn btn-primary' 
                    type='submit' style={{minWidth : '160px', display : 'flex', alignItems : 'center', justifyContent : 'center'}}
                    disabled={loading}
                >                 
                    Đăng kí
                </button>
                </div>
            </div>
        </form>
    );
}

export default RegisterForm