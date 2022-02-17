import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';

interface Props{
}

const UserDetail = (prop : Props) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const { userFromState } = useSelector((state: AppState) => ({
        userFromState: state.profile.user,
    }));
    console.log(userFromState);
    const [backgroundColor, setBackgourndColor] = React.useState('#fff')
    if (userFromState?.id && userFromState?.id % 2 == 0) setBackgourndColor('grey')
    return (
        <div style={{backgroundColor : backgroundColor, height : '100vh', color : ''}}>
            <div className='user-header'>
                User Profile
            </div>
            <div className='user-profile'>
                Hello {userFromState?.name}
            </div>
        </div>
    )
}

export default UserDetail;