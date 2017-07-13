import Link from 'next/link';
import React from 'react';
import Utils from '../lib/utils';
import Room from './room';

export default class Calendar extends React.Component {

  render(){

    let { rooms } = this.props;

    let renderedRooms = rooms.map((r, i)=>{
      return <Room key={i + Number(this.props.date)} {...r} date={ this.props.date }/>
    })

    let noRooms = <div className="empty">
      <p>No results for this criteria. </p>
      <p> Check the table below to improve your usage of the Omnibox. </p>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th> Attribute </th>
            <th> Pattern </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Name </td>
            <td> Room name contains the text </td>
          </tr>
          <tr>
            <td> Availability </td>
            <td> (nn:nn) Room is available at that time. <em> ex: 10:15 </em></td>
          </tr>
          <tr>
            <td> Minimum Size </td>
            <td> (nn m2) Minimum Room size <em> ex: 15 m2</em></td>
          </tr>
          <tr>
            <td> Minimum Capacity </td>
            <td> (nn people) Minimum Room people capacity <em> ex: 15 people</em></td>
          </tr>
        </tbody>
      </table>
    </div>

    return(<div className="calendar">
      <style jsx>{`
      `}
      </style>
      { rooms.length == 0 ? noRooms : renderedRooms }
    </div>)
  }

}

