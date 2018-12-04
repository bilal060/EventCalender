import React from 'react';
import MyCalender from './MyCalender';
import { CSVLink } from "react-csv";
import Modal from 'react-modal';
import './style.css';
import CreateModel from './models/CreateModel';
import UpdateModel from './models/UpdateModel';
import {
    CsvHeaers,
    CURRENT_EVENTS_LIST,
    CURRENT_DATE
} from './../Utils/enum'
import {
    makeCsvDate,
    changeCalenderdateClick,
    compareTime,
    convertTimeToISOString,
    convertTimeToString
} from './../Utils/util'

export default class MyEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            modalIsOpen: false,
            modalDetailIsOpen: false
        };
    }

    notify = () => {
        let {myEvents} = this.props;
        myEvents.map(event => {
            if(event.notify === false){
                var duration = compareTime(event.date);
                if(duration.asMinutes()>0 && duration.asMinutes() < 10){
                    this.props.onNotifyEvent(event.id);
                    alert("Your schedule event is going to start in "+ parseInt(duration.asMinutes(), 10) + "minutes.")
                }
            }
            return event;
        })
    };

    // Setting interval to show notification to user 10 min before.
    // Each notification will be showed to user 1 time.
    componentDidMount() {
        this.interval = setInterval(() => this.notify(), 1000*30);
    }

    componentWillUnmount() {
        clearInterval(this.interval);

    }
    componentWillMount() {
        let currDate = localStorage.getItem(CURRENT_DATE);
        if(currDate){
            this.props.changeMonth(JSON.parse(currDate));
        }

        let currEvents = localStorage.getItem(CURRENT_EVENTS_LIST);
        if(currEvents){
            this.props.onSetLocalStorageToRedux(JSON.parse(currEvents));
        }

    }

    openDetailModal() {
        this.setState({modalDetailIsOpen: true});
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.handleReset();
        this.setState({modalDetailIsOpen:false, modalIsOpen: false});
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleReset = () => {
        this.setState({
            id: '',
            title: '',
            date: '',
            modalIsOpen: false,
            modalDetailIsOpen : false
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let localState = this.state;
        localState.date = convertTimeToISOString(this.state.date);
        if (this.state.title.trim() && this.state.date.trim()) {
            if(this.state.id!=='' && this.state.id!==undefined){
                this.props.onUpdateMyEvent(localState);
            }else{
                localState.notify = false;
                this.props.onAddMyEvent(localState);
            }
            this.handleReset();
        }
    };

    removeEvent = (id) => {
        this.props.onRemoveMyEvent(this.state.id);
        this.handleReset();
    };

    showEvent = (calEvent) => {
        this.setState({
            title: calEvent.title,
            date: calEvent.date,
            id: calEvent.id,
            modalDetailIsOpen: true
        });
    };

    changeCalenderDate = (date,nextMonth) => {
        let newDate = changeCalenderdateClick(date, nextMonth);
        this.props.changeMonth(newDate);
    };

    changeEventDate = (eventBj, date) => {
        let newDate = new Date(eventBj.date);
        newDate.setDate(newDate.getDate() + date.days());
        let newEvent = {
            title: eventBj.title,
            date: newDate.getFullYear() + '-' + (newDate.getMonth()+1) + '-' +newDate.getDate(),
            id: eventBj.id
        };

        this.props.onUpdateMyEvent(newEvent);
    };

    changeDate = (date) => {
        let GTMdate = convertTimeToString(date);
        this.setState({date: GTMdate})
    };

    saveEventsToLocalStorage(){
        localStorage.setItem(CURRENT_DATE,JSON.stringify(this.props.currentDate));
        localStorage.setItem(CURRENT_EVENTS_LIST,JSON.stringify(this.props.myEvents));
    }

    render() {
        const add_btn = {
                backgroundColor:'red',
                color: '#ffff',
                float: 'left',
                position: 'fixed',
                bottom: '22px',
                right: '22px',
                borderRadius: '50px',
                height: '50px',
                width: '51px',
                zIndex:'10000',
                fontSize: '25px'
        };
        Modal.setAppElement('#root');

        let {myEvents} = this.props;
        let csv_data = makeCsvDate(myEvents);
        this.saveEventsToLocalStorage();

        return (
            <div>
                <button style={add_btn} onClick={this.openModal.bind(this)}>+</button>
                {myEvents.length > 0 &&
                    <CSVLink style={{padding: '0'}} data={csv_data} headers={CsvHeaers}>
                        <button style={{height:'34px', fontSize:'14px', color: '#ffff', backgroundColor: 'rgb(176, 130, 61)'}} className='previous'> Export CSV</button>
                    </CSVLink>
                }
                <a onClick={this.changeCalenderDate.bind(this, this.props.currentDate, +1)} className="next">Next &raquo;</a>
                <a onClick={this.changeCalenderDate.bind(this, this.props.currentDate, -1)} className="previous">&laquo; Previous</a>
                {this.state.modalIsOpen &&
                    <CreateModel
                        {...this.props}
                        state={this.state}
                        openModal={this.openModal.bind(this)}
                        closeModal={this.closeModal.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        showEvent={this.showEvent.bind()}
                        removeEvent={this.removeEvent.bind(this)}
                        changeEventDate={this.changeEventDate.bind(this)}
                        handleInputChange={this.handleInputChange.bind(this)}
                        changeDate={this.changeDate.bind(this)}
                    />
                }
                {this.state.modalDetailIsOpen &&
                    <UpdateModel
                        {...this.props}
                        state={this.state}
                        openModal = {this.openModal.bind(this)}
                        closeModal = {this.closeModal.bind(this)}
                        handleSubmit = {this.handleSubmit.bind(this)}
                        showEvent = {this.showEvent.bind()}
                        removeEvent = { this.removeEvent.bind(this)}
                        changeEventDate = { this.changeEventDate.bind(this)}
                        handleInputChange = { this.handleInputChange.bind(this)}
                        changeDate = {this.changeDate.bind(this)}
                    />
                }


                <div style={{height:'300px'}}>
                    <MyCalender
                        {...this.props}
                        state={this.state}
                        openModal = {this.openModal.bind(this)}
                        closeModal = {this.closeModal.bind(this)}
                        handleSubmit = {this.handleSubmit.bind(this)}
                        showEvent = {this.showEvent.bind(this)}
                        removeEvent = { this.removeEvent.bind(this)}
                        changeEventDate = { this.changeEventDate.bind(this)}
                        handleInputChange = { this.handleInputChange.bind(this)}
                        changeDate = {this.changeDate.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

