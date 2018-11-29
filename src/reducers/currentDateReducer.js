import { CHANGE_MONTH } from '../actions/types';

export default function currentDateReducer(state = [], action) {
  switch (action.type) {
      case CHANGE_MONTH:
      return action.payload.date;

    default:
      return state;
  }
}