import React from 'react';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../style.css';

export default class UpdateModel extends React.Component {
    render() {

        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                width                 : '50%',
                transform             : 'translate(-50%, -50%)',
                zIndex                : '10000',
                height                : '70%'
            },
        };
        let date = '';
        if(this.props.state.date!== undefined && this.props.state.date !== '') {
            date = new Date(this.props.state.date);
        }
        else {
            date = new Date();
        }
        return (
            <div>
                <Modal
                    isOpen={this.props.state.modalDetailIsOpen}
                    onRequestClose={this.props.closeModal}
                    style={customStyles}  >
                    <div className='modelHeading'>Update your Event</div>
                    <div>
                        <textarea
                            placeholder="description"
                            className="form-control textArea"
                            name="title"
                            onChange={ this.props.handleInputChange }
                            value={ this.props.state.title }>
                            </textarea>
                        <DatePicker
                            selected={date}
                            name="date"
                            className="datepicker"
                            onChange={ this.props.changeDate }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm"
                            timeCaption="time"
                        />
                    </div>
                    <div style={{marginTop: '50%'}}>
                        <button className='modelBtn' onClick={this.props.closeModal}>CLOSE</button>
                        <button className='modelBtn' onClick={this.props.handleSubmit}>UPDATE</button>
                        <button className='modelBtn' onClick={this.props.removeEvent}>REMOVE</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

