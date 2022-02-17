import { replace } from 'connected-react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import Header from '../components/Header';
import UserDetail from '../components/UserDetail';

const UserDetailPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const { userFromState } = useSelector((state: AppState) => ({
        userFromState: state.profile.user,
    }));
    useEffect(()=>{
        if(!userFromState?.id){
            dispatch(replace(ROUTES.home))
            return;
        }
    },[dispatch])
    
    return( 
        <div>
            <Header/>
            <UserDetail/>
        </div>
    )
}

export default UserDetailPage;