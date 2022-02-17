import { ActionType, getType, createCustomAction } from "typesafe-actions";
import { IPhoto } from "../../../models/photo";

export interface PhotosState {
    photo? : IPhoto;
    photos? : Array<IPhoto>;
}
export const setPhoto = createCustomAction('home/setPhoto',(data: IPhoto) => ({
    data,
}))
export const setPhotos = createCustomAction('home/setPhotos',(data : IPhoto[]) => ({
    data,
}));

const actions = {setPhoto, setPhotos};

type Action = ActionType<typeof actions>;

export default function reducer(state: PhotosState = {}, action : Action) {
    switch (action.type) {
        case getType(setPhoto):
            return {...state, photo : action.data}
        case getType(setPhotos):
            return {...state, photos : action.data};
        default : 
            return state;
    }
}