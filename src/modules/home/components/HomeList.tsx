import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "typesafe-actions";
import { IPhoto } from "../../../models/photo";
import { AppState } from "../../../redux/reducer";
import { setPhoto } from "../../auth/redux/photosReducer";

interface Props{

}

const HomeList = (props : Props ) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const {photos} = useSelector((state: AppState) => ({
        photos : state.photos,
      }));
    const renderPhotos = () => {
        const arrPhoto :JSX.Element[] = [
        ];
        photos.photos?.map((photo : IPhoto, index : number) => {
            arrPhoto.push(
                <div className="photoInfor" key={index}>
                    <div className="photoImg">
                        <img src={photo.url.toString()} alt="" />
                    </div>
                    <div className="photoContent">
                        <input type="text" id ='inputTitle' 
                        className="form-control" 
                        value={photo.title.toString()}
                        onChange = {
                            (e) => {
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
            {renderPhotos()}       
        </div>
    )
}


export default HomeList;