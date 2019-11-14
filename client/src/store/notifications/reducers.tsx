import { ENotificationsActionTypes } from './types';
import { AnyAction } from 'redux';
import { INotification } from '../../models/notifications';

export type INotificationsState = INotification[];

const initialState: INotificationsState = [];

export default function(state: INotificationsState = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case ENotificationsActionTypes.ADD_NOTIFICATION:
      return [...state, payload];
    case ENotificationsActionTypes.REMOVE_NOTIFICATION:
      return state.filter((item: INotification) => item.id !== payload.id);
    default:
      return state;
  }
}
