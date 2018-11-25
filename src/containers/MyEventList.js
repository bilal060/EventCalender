import { connect } from 'react-redux';
import {createMyEvent, deleteMyEvent, updateMyEvent, notifyEvent} from '../actions';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import MyEventList from '../components/MyEventList';

const mapStateToProps = state => {
  return {
      myEvents: state.myEvents
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
    }

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEventList);