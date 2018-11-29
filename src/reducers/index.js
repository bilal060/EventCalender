import { combineReducers } from 'redux';
import myEvents from './myEventsReducer';
import currentDate from './currentDateReducer';

export default combineReducers({
    myEvents: myEvents,
    currentDate: currentDate
});