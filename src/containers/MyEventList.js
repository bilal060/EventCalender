import { connect } from 'react-redux';
import {createMyEvent, deleteMyEvent, updateMyEvent, notifyEvent, changeMonth, setLocalStorageToRedux} from '../actions';
import MyEventList from '../components/MyEventList';

const mapStateToProps = state => {
  return {
      myEvents: state.myEvents,
      currentDate: state.currentDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddMyEvent: myEvent => {
      dispatch(createMyEvent(myEvent));
    },
    onUpdateMyEvent: myEvent => {
        dispatch(updateMyEvent(myEvent));
    },
    onRemoveMyEvent: id => {
      dispatch(deleteMyEvent(id));
    },
    onNotifyEvent: id => {
        dispatch(notifyEvent(id));
    },
    changeMonth: date => {
      dispatch(changeMonth(date));
    },
    onSetLocalStorageToRedux: events => {
        dispatch(setLocalStorageToRedux(events));
    }


  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEventList);