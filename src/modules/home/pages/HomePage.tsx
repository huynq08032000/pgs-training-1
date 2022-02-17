import { replace } from 'connected-react-router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import Header from '../../auth/components/Header';
import { setPhotos } from '../../auth/redux/photosReducer';
import { fetchThunk } from '../../common/redux/thunk';
import HomeList from '../components/HomeList';


const HomePage = () => {

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getPhotos = React.useCallback(
    async() => {
      console.log('Processing');
      
      let urlAPI = 'https://jsonplaceholder.typicode.com/photos'
      const json = await dispatch(fetchThunk(urlAPI,'get'));
      if(json){
        dispatch(setPhotos(json.slice(0,10)));   
        console.log('Set thanh cong');       
        return;
      }
      console.log("Không load được dữ liệu")
      return;
    },[dispatch]
  )

  React.useEffect(()=>{
    getPhotos()
  },[])
  
  return(
    <div>
      <Header/>
      <div className="container"
      style={{
      maxWidth : '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'}}>
      <HomeList/>
      </div>
    </div>
    
  )
};

export default HomePage;
