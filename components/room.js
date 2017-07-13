import React from 'react';
import TimeSlider from './timeSlider';
import Utils from '../lib/utils';
import Attendee from './attendee';
import Dropdown from './dropdown';
import moment from 'moment';


const Details = ({props})=>(
  <div className="row">
    <div className="col-md-4 col-lg-4 col-sm-4">
      <img src={Utils.imageURL(props.images[0])} className="img-responsive img-thumbnail" alt="Room Image"/>
    </div>
    <div className="col-md-8 col-lg-8 col-sm-8">
      <table className="table table-striped table-bordered">
        <tbody>

          <tr>
            <td>Room Name</td>
            <td><strong>{props.name}</strong></td>
          </tr>
          <tr>
            <td>Floor</td>
            <td><strong>{props.location}</strong></td>
          </tr>
          <tr>
            <td>Capacity</td>
            <td><strong>{props.capacity} people</strong></td>
          </tr>
          <tr>
            <td>Size</td>
            <td><strong>{props.size}</strong></td>
          </tr>
          <tr>
            <td>Equipment</td>
            <td><strong> { props.equipment.join(", ")} </strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default class Room extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      bookingMode: false,
      showDetails: false,
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

  toggleBooking(){
    this.setState({bookingMode: !this.state.bookingMode, showDetails: !this.state.bookingMode ? false : this.state.showDetails })
  }
  toggleDetails(){
    this.setState({showDetails: !this.state.showDetails, bookingMode: !this.state.showDetails ? false : this.state.bookingMode })
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

  onTimePick(e){
    let booking = this.state.booking;
    booking[e.target.name] = e.target.value
    this.setState({ booking: booking })
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
    //Validate
    //send form
    if(this.validateBooking()){
      console.log("sending request")
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

    return(<div className="room">
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
      `}
      </style>
      <div className="panel panel-default">
        <div className="panel-body">
          <h4><strong> Room { this.props.name } on { this.props.location }</strong></h4>
          <div className="timeslider_container">
            <TimeSlider availabilities={this.props.avail} booking={ this.state.bookingMode ? this.state.booking : false}/>
          </div>
          { this.state.success ? <p className="text-success">Booked the room successfully!</p> : null }
          <div className="actions">
            <button className="btn action btn-brand-orange"    onClick={(e)=>{ this.toggleBooking(e)}}>Book</button>
            <button className="btn action btn-brand-orange" onClick={(e)=>{ this.toggleDetails(e)}}>{ this.state.showDetails ? 'Hide Details': 'Show Details'}</button>
          </div>
          { this.state.bookingMode ? <Dropdown>
            <div className="booking">
              <h4> Manage Booking </h4>
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
              <div className="form-inline">
                <div className="form-group">
                  <label className="margin-label">From</label>
                  <select name="from" className="form-control" onChange={ (e)=> this.onTimePick(e)}>
                    { this.timeOptions("06:59") }
                  </select>
                  <label className="margin-label">To</label>
                  <select name="to" className="form-control" onChange={ (e)=> this.onTimePick(e)}>
                    { this.timeOptions(this.state.booking.from) }
                  </select>
                </div>
              </div>
              <h5> Attendees </h5>
              <div className="attendees">
                { this.state.attendees.map((attendee, i)=>{
                  let error = this.state.errors.attendees[i];
                  return <div key={i}>
                    { /* <span className="text-danger">{error}</span> */}
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
          </Dropdown>: null }
          { this.state.showDetails ? <Details props={this.props}/> : null }
        </div>
      </div>
    </div>)
  }
}
