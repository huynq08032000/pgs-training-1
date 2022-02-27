import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import photosReducer, { PhotosState } from '../modules/auth/redux/photosReducer';
import dataReducer, { DataState } from '../modules/intl/redux/dataReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  photos : PhotosState;
  data: DataState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    photos : photosReducer,
    data : dataReducer,
  });
}
