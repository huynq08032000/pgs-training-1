import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPayroll} from '../../../models/data';

export interface DataState {
  payroll?:IPayroll
}


  export const setPayroll = createCustomAction('set/setPayroll', (data: IPayroll) => ({
    data,
  }));

const actions = { setPayroll };

type Action = ActionType<typeof actions>;

export default function reducer(state: DataState = {}, action: Action) {
  switch (action.type) {
    case getType(setPayroll):
      return {...state, payroll: action.data}
    default:
      return state;
  }
}
