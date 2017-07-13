import React from 'react';

export default class Attendee extends React.Component {

  updateUser(e){
    let { attendee, index } = this.props;
    attendee[e.target.name] = e.target.value
    this.props.updateUser(index, attendee)
  }

  render(){
    let { attendee, index, error } = this.props;
    return(<div className="attendee">
      <style jsx>{`
        .attendee {
            margin: 10px 0;
        }
        .btn-brand-danger {
            background: #E31E2F;
            color: white;
        }
        .btn-brand-danger:hover {
          background: #e23d4c;
        }
        .btn-brand-danger:active {
            background: #a91723;
        }
        .input {
          margin-right: 10px;
        }
      `} </style>
      <div className="form-inline">
        <div className={(error && !attendee.name) ? "form-group has-error" : "form-group"}>
          <input name="name"  type="text" className="input form-control" placeholder="Name"   value={attendee.name}  onChange={(e)=> this.updateUser(e)}/>
        </div>
        <div className={(error && !attendee.email) ? "form-group has-error" : "form-group"}>
          <input name="email" type="email" className="input form-control" placeholder="Email" value={attendee.email} onChange={(e)=> this.updateUser(e)}/>
        </div>
        <div className={(error && !attendee.number) ? "form-group has-error" : "form-group"}>
          <input name="number" type="text" className="input form-control" placeholder="Phone Number"  value={attendee.number} onChange={(e)=> this.updateUser(e)}/>
        </div>
        <button className="btn btn-brand-danger" onClick={ (e)=>{ this.props.removeAttendee(index)}}>Remove</button>
      </div>
    </div>)
  }
}