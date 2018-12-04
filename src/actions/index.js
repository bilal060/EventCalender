import uuidv4 from 'uuid/v4';
import { ADD_MY_EVENT, DELETE_MY_EVENT, UPDATE_MY_EVENT, NOTIFY_EVENT, CHANGE_MONTH, SET_LOCAL_STORAGE_TO_STATE } from './types';

export const createMyEvent = ({ title, date,notify }) => ({
  type: ADD_MY_EVENT,
  payload: {
      id: uuidv4(),
      title,
      date,
      notify
  }
});

export const updateMyEvent = ({ id, title, date }) => ({
    type: UPDATE_MY_EVENT,
    payload: {
        id,
        title,
        date
    }
});

export const deleteMyEvent = id => ({
  type: DELETE_MY_EVENT,
  payload: {
    id
  }
});

export const notifyEvent = id => ({
    type: NOTIFY_EVENT,
    payload: {
        id
    }
});

export const changeMonth = date => ({
    type: CHANGE_MONTH,
    payload: {
        date
    }
});

export const setLocalStorageToRedux = events => ({
    type: SET_LOCAL_STORAGE_TO_STATE,
    payload: {
        events
    }
});