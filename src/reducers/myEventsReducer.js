import { ADD_MY_EVENT, DELETE_MY_EVENT, UPDATE_MY_EVENT, NOTIFY_EVENT } from '../actions/types';

export default function myEventsReducer(state = [], action) {
  switch (action.type) {
    case ADD_MY_EVENT:
      return [...state, action.payload];

    case DELETE_MY_EVENT:
      return state.filter(myEvent => myEvent.id !== action.payload.id);

    case UPDATE_MY_EVENT:
        return state.map(myEvent => {
          if(myEvent.id === action.payload.id){
              myEvent.title = action.payload.title;
              myEvent.date = action.payload.date;
            return myEvent;
          }
            return myEvent;
        });

    case NOTIFY_EVENT:
      return state.map(myEvent => {
          if(myEvent.id === action.payload.id){
              myEvent.notify = true;
              return myEvent;
          }
          return myEvent;
      });
    default:
      return state;
  }
}