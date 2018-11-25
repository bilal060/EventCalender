import React from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import { CSVLink } from "react-csv";
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import Modal from 'react-modal';
import './style.css';
import CreateModel from './models/CreateModel';
import UpdateModel from './models/UpdateModel';
var moment = require('moment');

export default class MyEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            modalIsOpen: false,
            modalDetailIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showEvent = this.showEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.changeEventDate = this.changeEventDate.bind(this);

    }

    notify = () => {
        let {myEvents} = this.props;
        myEvents.map(event => {
            if(event.notify === false){
                var now = moment(new Date()); //todays date
                var end = moment(event.date); // another date
                var duration = moment.duration(end.diff(now));
                if(duration.asMinutes()>0 && duration.asMinutes() < 40){
                    this.props.onNotifyEvent(event.id);
                    alert("Your schedule event is going to start in "+ parseInt(duration.asMinutes(), 10) + "minutes.")
                }
            }
            return event;
        })
    };

    componentDidMount() {
        this.interval = setInterval(() => this.notify(), 1000*60*10);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        localState.date = moment(this.state.date).toISOString();
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
        let GTMdate = moment(date).format();
        this.setState({date: GTMdate})
    };

    render() {
        const add_btn = {
                backgroundColor:'red',
                color: '#ffff',
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
        let csv_data = [];

        if(myEvents){
            myEvents.map(event => {
                csv_data.push({id:event.id, description: event.title, date: moment(event.date).format('YYYY-MM-DD HH:SS')})
                event.date = moment(event.date).format();
                return event;
            });
        }
        let headers = [
            { label: "Event ID", key: "id" },
            { label: "Event Description", key: "description" },
            { label: "Event Date", key: "date" }
        ];

        return (
            <div>
                <button style={add_btn} onClick={this.openModal}>+</button>
                <CSVLink data={csv_data} headers={headers}>
                    Download me
                </CSVLink>
                <CreateModel
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

                <div style={{height:'300px'}}>
                    <FullCalendar
                        id="my-calender-event"
                        contentHeight= '300px'
                        defaultDate={'2018-11-23'}
                        navLinks={true}
                        editable={true}
                        eventLimit={true}
                        timeFormat= 'H(:mm)A'
                        events={this.props.myEvents}
                        eventDrop={(eventBj, date) => this.changeEventDate(eventBj, date)}
                        drop={(date, jsEvent, ui, resourceId) => this.changeEventDate}
                        select={(start, end, allDay) => {
                            this.handleSelect(start, end, allDay);
                        }}
                        eventClick = {(calEvent, jsEvent, view, resourceObj) => {this.showEvent(calEvent)}}
                    /></div>
            </div>
        );
    }
}

