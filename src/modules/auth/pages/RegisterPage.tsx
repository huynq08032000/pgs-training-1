import React, { useEffect } from "react";
import logo from '../../../images/logo-420-x-108.png';
import RegisterForm from "../components/RegisterForm";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "typesafe-actions";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { IRegisterParams } from "../../../models/auth";
import { replace } from "connected-react-router";
import { ROUTES } from "../../../configs/routes";
import { getErrorMessageResponse } from "../../../utils";

const RegisterPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [locations, setLocations] = React.useState([]);
    
    const getLocation = React.useCallback(async () => {
        setLoading(true);
        const json = await dispatch(fetchThunk(API_PATHS.getLocation,'get'))
        setLoading(false)

        if(json?.code == RESPONSE_STATUS_SUCCESS){
            setLocations(json.data)
            return;
        }
    },[]);

    useEffect(() => {
        getLocation();
    },[]);
    const onRegister = React.useCallback(
        async(values : IRegisterParams)=>{
            setErrorMessage('');
            setLoading(true);
            
            const json = await dispatch(fetchThunk(API_PATHS.signUp,'post',values));
            setLoading(false)

            if(json?.code ===RESPONSE_STATUS_SUCCESS){
                alert("Chúc mừng bạn đăng kí thành công")
                dispatch(replace(ROUTES.login))
                return;
            }
            setErrorMessage(getErrorMessageResponse(json))

        },[dispatch]    
    );
    return (

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
            <RegisterForm onRegister={onRegister} loading = {loading} errorMessage={errorMessage} locations={locations} />
        </div>
    );
}

export default RegisterPage;