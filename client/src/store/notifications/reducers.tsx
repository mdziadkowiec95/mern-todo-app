import { ENotificationsActionTypes } from './types';
import { AnyAction } from 'redux';

interface Notification {
  id: string;
  type: string;
  msg: string;
}

export type INotificationsState = Notification[];

const initialState: INotificationsState = [];

export default function(
  state: INotificationsState = initialState,
  action: AnyAction
) {
  const { type, payload } = action;

  switch (type) {
    case ENotificationsActionTypes.ADD_NOTIFICATION:
      return [...state, payload];
    case ENotificationsActionTypes.REMOVE_NOTIFICATION:
      return state.filter((item: Notification) => item.id !== payload.id);
    default:
      return state;
  }
}
