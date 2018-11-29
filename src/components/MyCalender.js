import React from 'react';
import Event from './Event'
import './style.css';
import {monthNames} from '../Utils/enum';
import {
    getDateArray,
    getDayName,
    getArrayElement
} from '../Utils/util';

export default class MyCalender extends React.Component {

    render() {
        let alldates = getDateArray(this.props.currentDate);
        let currDate = new Date(this.props.currentDate);
        let today = new Date();
        let yearLabel = monthNames[currDate.getMonth()] + ' ' + currDate.getFullYear();

        let row1 = getArrayElement(alldates, 0, 6);
        let row2 = getArrayElement(alldates, 7, 13);
        let row3 = getArrayElement(alldates, 14, 20);
        let row4 = getArrayElement(alldates, 21, 27);
        let row5 = getArrayElement(alldates, 27, alldates.length);

        return (
            <div id="calendar-wrap">
                <header>
                    <h1> {yearLabel} </h1>
                </header>
                <div id="calendar">
                    <ul className="weekdays">
                        {row1.map((val,i) =>
                            <li key={i}>{getDayName(val)}</li>
                        )}
                    </ul>
                    <ul className="days">
                        {row1.map((val,i) =>
                             <li key={val.getDate()} className={"day other-month " + (val.getDate() === today.getDate() ? 'current-date' : '')}>
                                    <div className="date">{val.getDate()}</div>
                                 <Event
                                     {...this.props}
                                     curr_date = {val}
                                 />
                             </li>
                        )}
                    </ul>
                    <ul className="days">
                        {row2.map((val,i) =>
                            <li key={val.getDate()} className={"day other-month " + (val.getDate() === today.getDate() ? 'current-date' : '')}>
                                <div className="date">{val.getDate()}</div>
                                <Event
                                    {...this.props}
                                    curr_date = {val}
                                />
                            </li>
                        )}
                    </ul>
                    <ul className="days">
                        {row3.map((val,i) =>
                            <li key={val.getDate()} className={"day other-month " + (val.getDate() === today.getDate() ? 'current-date' : '')}>
                                <div className="date">{val.getDate()}</div>
                                <Event
                                    {...this.props}
                                    curr_date = {val}
                                />
                            </li>
                        )}
                    </ul>
                    <ul className="days">
                        {row4.map((val,i) =>
                            <li key={val.getDate()}  className={"day other-month " + (val.getDate() === today.getDate() ? 'current-date' : '')}>
                                <div className="date">{val.getDate()}</div>
                                <Event
                                    {...this.props}
                                    curr_date = {val}
                                />
                            </li>
                        )}
                    </ul>
                    <ul className="days">
                        {row5.map((val,i) =>
                            <li key={val.getDate()} className={"day other-month " + (val.getDate() === today.getDate() ? 'current-date' : '')}>
                                <div className="date">{val.getDate()}</div>
                                <Event
                                    {...this.props}
                                    curr_date = {val}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

