import React from 'react';
import {
    compare_dates,
    displayTime
} from '../Utils/util';

export default class Event extends React.Component {

    render() {
        let allEvents = []
        this.props.myEvents.forEach(val => {
            if(compare_dates(val,this.props.curr_date)){
                allEvents.push( <div key={val.id} className="event" onClick={()=>this.props.showEvent(val)}>
                            <div className="event-desc">
                                {val.title}
                            </div>
                            <div className="event-time">
                                {displayTime(val)}
                            </div>
                        </div>)
            }
        });

        return (
            <div>
                {allEvents}
            </div>
        );
    }
}

