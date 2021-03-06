import React, { useEffect } from 'react';
import logo from '../../../images/logo-420-x-108.png';
import LoginForm from '../components/LoginForm';
import { ILoginParams } from '../../../models/auth';
import {useDispatch, useSelector} from 'react-redux' ;
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { getErrorMessageResponse } from '../../../utils';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

const LoginPage = () =>{
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    useEffect(() => {
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
        if(accessToken){
            dispatch(replace(ROUTES.home))
            return
        }
        dispatch(replace(ROUTES.login))
        return;
    },[dispatch])
    const onLogin = React.useCallback(
        async(values : ILoginParams)=>{
            setErrorMessage('');
            setLoading(true);
            const json = await dispatch(
                fetchThunk(API_PATHS.signIn,'post',{email:values.email , password : values.password}),
            );
            setLoading(false);
            if(json?.code === RESPONSE_STATUS_SUCCESS){
                dispatch(setUserInfo(json.data));
                Cookies.set(ACCESS_TOKEN_KEY, json.data.token, {expires : values.rememberMe? 7 : undefined})
                console.log('Goi den trang home');
                
                dispatch(replace(ROUTES.home));
                return;
            }
            setErrorMessage(getErrorMessageResponse(json));
        },[dispatch]    
    );

    
    return(
        <div
            className="container"
            style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'}}
            >
            <img src={logo} style={{maxWidth : '250px', margin : '32px'}}></img>
            <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage}/>
        </div>
    );
}

export default LoginPage;