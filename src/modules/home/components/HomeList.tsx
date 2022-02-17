import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "typesafe-actions";
import { IPhoto } from "../../../models/photo";
import { AppState } from "../../../redux/reducer";
import { PhotosState, setPhoto, setPhotos } from "../../auth/redux/photosReducer";

const HomeList = () => {
    
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [callback, setCallBack] = useState(true)
    const {photos} = useSelector((state: any) => ({
        photos : state.photos,
      }));

    const [newPhotos, setNewPhotos] = React.useState<PhotosState>()    
    React.useEffect(()=>{
        console.log('goi vao day');
        
        setNewPhotos(photos);
        setCallBack(false)
    },[callback])

    const renderPhotos = () => {
        const arrPhoto :JSX.Element[] = [
        ];
        newPhotos?.photos?.map((photo : IPhoto) => {
            arrPhoto.push(
                <div className="photoInfor" key={photo.id}>
                    <div className="photoImg">
                        <img src={photo.url.toString()} alt="" />
                    </div>
                    <div className="photoContent">
                        <input type="text" id ='inputTitle' 
                        className="form-control" 
                        value={photo.title.toString()}
                        onChange = {
                            (e) => {
                                // setNewPhotos({...photos})
                                console.log('In photos');
                                console.log(photos);
                                
                                console.log('In newphotos');
                                console.log(newPhotos)
                                photo.title = e.target.value
                                dispatch(setPhoto({...photo}))                          
                        }}
                        />
                    </div>
                </div>
            )
            
        })
        return arrPhoto;
    }

    return(
        <div className="content">
            <div style={{margin : '10px 0', float : 'right'}}>
                <button className="btn btn-primary"
                    onClick={
                        () => {
                        let arr : any = newPhotos?.photos
                        dispatch(setPhotos(arr)) 
                        setCallBack(true)
                        }
                    }
                >Confirm
                </button>
                <button className="btn btn-primary" style={{marginLeft : '10px'}}
                onClick = {
                        () => {
                        setNewPhotos(photos)
                        }
                }
                >Reset
                </button>
            </div>
            {renderPhotos()}  
                 
            
        </div>
    )
}


export default HomeList;