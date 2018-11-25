import { combineReducers } from 'redux';
import myEvents from './myEventsReducer';

export default combineReducers({
    myEvents: myEvents
});