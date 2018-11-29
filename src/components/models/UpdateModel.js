import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../style.css';

export default class UpdateModel extends React.Component {
    render() {
        let date = '';
        if(this.props.state.date!== undefined && this.props.state.date !== '') {
            date = new Date(this.props.state.date);
        }
        else {
            date = new Date();
        }
        return (
            <div>
                <div id="myModal" className="modal">

                    <div className="modal-content">
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
                            <div style={{height: '30px'}}>
                                <button className='modelBtn' onClick={this.props.closeModal}>CLOSE</button>
                                <button className='modelBtn' onClick={this.props.handleSubmit}>UPDATE</button>
                                <button className='modelBtn' onClick={this.props.removeEvent}>REMOVE</button>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        );
    }
}

