import { ENotificationsActionTypes } from './types';
import { AnyAction } from 'redux';
import { INotification } from '../../models/notifications';
import { EAuthActionTypes } from '../auth/types';

export type INotificationsState = INotification[];

const initialState: INotificationsState = [];

export default function(
  state: INotificationsState = initialState,
  action: AnyAction
): INotificationsState {
  const { type, payload } = action;

  switch (type) {
    case EAuthActionTypes.LOGOUT_USER:
      return initialState; // This is just as test for future reducers
    case ENotificationsActionTypes.ADD_NOTIFICATION:
      return [...state, payload];
    case ENotificationsActionTypes.REMOVE_NOTIFICATION:
      return state.filter((item: INotification) => item.id !== payload.id);
    default:
      return state;
  }
}
