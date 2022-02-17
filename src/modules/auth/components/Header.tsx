import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import react from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { setUserInfo } from '../redux/authReducer';

const Header = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const handleLogout = () => {
        const userTmp : any = {}
        dispatch(setUserInfo(userTmp))
        Cookies.remove(ACCESS_TOKEN_KEY);
        dispatch(replace(ROUTES.login))
        return;
    }
    return (
        <div className='navbar' style={{height : '48px', backgroundColor : '#0d6efd', padding : '0 10px'}}>
            <div className="nav-right" >
                <a href="/home" style={{color : '#fff'}}>Home</a>
                <a href="/contact" style={{color : '#fff'}}>Contact</a>
            </div>
            <div className="nav-left">
                <div className='user-profile'>
                    <a href="/userdetail" style={{color : '#fff'}}>Profile</a>
                </div>
                <div className='btn-logout'
                    onClick={handleLogout}
                >Logout</div>
            </div>
        </div>
    );
}

export default Header;
