import React from 'react';
import TimeSlider from './timeSlider';
import Utils from '../lib/utils';
import Attendee from './attendee';
import Dropdown from './dropdown';
import moment from 'moment';
import { CSSTransitionGroup } from 'react-transition-group'
import { Modal } from 'react-bootstrap';

export default class BookingModal extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      attendees: [{}],
      booking: {
        from: "07:00",
        to: "08:00",
        title: "",
        description: ""
      },
      errors: {
        attendees: [],
        booking: {},
        server: ""
      }
    }
  }

  addAttendee(){
    let attendees = this.state.attendees;
    attendees.push({})
    this.setState({attendees: attendees})
  }
  removeAttendee(i){
    let attendees = this.state.attendees
    attendees.splice(i, 1)
    this.setState({attendees: attendees})
  }
  updateAttendee(i, user){
    let attendees = this.state.attendees
    attendees[i] = user
    this.setState({attendes: attendees})
  }

  onChange(e){
    let booking = this.state.booking
    booking[e.target.name] = e.target.value
    this.setState({booking: booking})
  }

  onTimePick(booking){
    let newBooking = Object.assign({}, this.state.booking, booking);
    this.setState({ booking: newBooking })
  }

  timeOptions(min){
    let min_hour = min.split(":")[0]
    let min_minute = min.split(":")[1]
    return [...Array(49)].map((_,i) =>{
      let totalMinutes = 420 + i * 15
      let hour = Math.floor(totalMinutes / 60)
      let minutes = totalMinutes % 60
      if(hour < min_hour || (hour == min_hour && minutes <= min_minute)){
        return
      }
      let val = `${hour < 10 ? "0"+hour : hour}:${minutes == 0 ? "00" : minutes}`

      return <option key={i} value={val}>{val}</option>
    })
  }

  validateBooking(){
    let errors = { attendees: [], booking: {}}

    if(!this.state.booking.title){
      errors.booking.title = "Title is required"
    }
    if(!this.state.booking.description){
      errors.booking.description = "Description is required"
    }
    this.state.attendees.map((attendee,i)=>{
      if(!attendee.name || !attendee.number || !attendee.email){
        errors.attendees[i] = "Attendee requires a name, phone and email"
      }
    })


    let bookingFrom = Utils.normalizeTime(this.state.booking.from)
    let bookingTo =   Utils.normalizeTime(this.state.booking.to)
    let validBooking = false;
    this.props.avail.map((block,i)=>{
      let frm = Utils.normalizeTime(block.split("-")[0])
      let to = Utils.normalizeTime(block.split("-")[1])
      if(Utils.between(bookingFrom,frm,to) && Utils.between(bookingTo,frm,to)){
        validBooking = true;
      }

    })
    if(!validBooking){
      errors.booking.times = "The booking times are invalid. Please make sure the room is unoccupied in the time range."
    }
    this.setState({errors: errors})
    if(errors.attendees.length || !validBooking || errors.booking.title || errors.booking.description){
      return false
    }
    return true
  }

  commitBooking(){
    if(this.validateBooking()){
      Utils.submitBooking({
        passes: this.state.attendees,
        booking: {
          room: this.props.name,
          date: Number(this.props.date),
          title: this.state.booking.title,
          description: this.state.booking.description,
          time_start: Number(Utils.toDate(this.props.date, this.state.booking.from)),
          time_end: Number(Utils.toDate(this.props.date, this.state.booking.to)),
        }
      }).then((response)=>{
        if(response.error){
          let err = this.state.errors;
          err.server = response.error.text;
          this.setState({ error: err, success: false })
        } else {
          this.setState({ success: true, bookingMode: false })
        }
      })

    } else {
      console.log("errors found", this.state.errors)
    }
  }

  render(){

    return(<div className="booking">
      <style jsx>{`
        .btn-brand-orange {
            background: #EC7B23;
            color: white;
        }
        .btn-brand-dark-blue {
            background: #362A83;
            color: white;
        }
        .btn-brand-dark-blue:active, .btn-brand-dark-blue:hover {
          color: white;
        }
        .btn-brand-orange:hover {
            background: #f19956;
            color: white;
        }
        .btn-brand-orange:active {
            background: #da7221;
            color: white;
        }
        .action {
            margin-right: 5px;
        }
        .actions {
            margin-bottom: 10px;
        }
        .timeslider_container {
            margin: 30px 0;
        }
        .attendees {
            margin-bottom: 10px;
        }
        select {
            margin: 0 10px;
        }
        .booking {
          overflow: hidden;
          transition: max-height 1s ease;
        }
      `}
      </style>
      <Modal bsSize="lg" show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title> Manage Booking on Room { this.props.name } on { this.props.location } </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.state.success ? <p className="text-success">Booked the room successfully!</p> : null }
          <div className="timeslider_container">
            <TimeSlider onTimePick={ (e)=> this.onTimePick(e) } availabilities={this.props.avail} booking={ this.state.booking }/>
          </div>
          <div key={0} className="booking">
            { this.state.errors.server ? <p className="text-danger">{ this.state.errors.server }</p> : null}
            <div className={ this.state.errors.booking.title ? "form-group has-error" : "form-group"}>
              <label> Event Title </label>
              <input value={ this.state.booking.title }
                     type="text" name="title"
                     className="form-control" onChange={(e)=>{ this.onChange(e)}}
              />
            </div>
            <div className={ this.state.errors.booking.description ? "form-group has-error" : "form-group"}>
              <label> Event Description </label>
              <textarea value={ this.state.booking.description } name="description"
                  className="form-control"
                  onChange={(e)=>{ this.onChange(e)}}
              />
            </div>
            <p className="text-danger">{ this.state.errors.booking.times }</p>
            <div className="row">
              <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="form-inline">
                  <div className="form-group">
                    <label className="margin-label">From</label>
                    <select value={this.state.booking.from} name="from" className="form-control" onChange={ (e)=> this.onTimePick({from: e.target.value})}>
                      { this.timeOptions("06:59") }
                    </select>
                    <label className="margin-label">To</label>
                    <select value={this.state.booking.to} name="to" className="form-control" onChange={ (e)=> this.onTimePick({to: e.target.value})}>
                      { this.timeOptions(this.state.booking.from) }
                    </select>
                  </div>
                </div>
                <h5> Attendees </h5>
                <div className="attendees">
                  { this.state.attendees.map((attendee, i)=>{
                    let error = this.state.errors.attendees[i];
                    return <div key={i}>
                      <Attendee
                        error={!!error}
                        key={i} index={i}
                        attendee={attendee} updateUser={ (i, user) => this.updateAttendee(i, user) }
                        removeAttendee={ (i) => this.removeAttendee(i)}/>
                    </div>
                  })}
                </div>
                <button className="action btn btn-brand-orange" onClick={ ()=> this.addAttendee() }>Add Attendee </button>
                <button className="action btn btn-brand-orange" onClick={ ()=> this.commitBooking() }>Save Booking </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>)
  }
}
