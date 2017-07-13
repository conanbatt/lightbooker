import Layout from '../components/layout'
import Calendar from '../components/calendar'
import DatePicker from '../components/datePicker'
import Filters from '../components/filters';
import Utils from '../lib/utils';

import 'isomorphic-fetch'
import React from 'react'

export default class extends React.Component {

  static async getInitialProps({ req }){
    //Code that fetches initial props here
    return {
      rooms: await Utils.getRooms({date: "today"})
    }

  }

  constructor(props){
    super(props)
    this.state = {
      rooms: this.props.rooms,
      date: new Date(),
      omniFilter: ""
    }
  }

  filteredRooms(){
    return this.state.rooms.filter(room => {
      return Utils.filter(room, this.state.omniFilter)
    })
  }

  onFilterChange(omniFilter){
    this.setState({ omniFilter: omniFilter })

  }

  onPick(date){
    Utils.getRooms({date: Number(date)}).then(rooms=> {
      this.setState({rooms: rooms, date: date})
    })
  }

  render(){

    return(<Layout>
      <div className="index">
        <style jsx>{`
          .bg-brand-dark-green {
              background: #009547;
              color: white;
          }
        `}</style>
        <div className="container">
          <div className="jumbotron bg-brand-dark-green">
            <h1 className=""> LightBooker </h1>
            <p className="lead">Check Room availability and manage access to them with this awesome site.</p>
          </div>
          <DatePicker date={ this.state.date } onPick={ (date)=> { this.onPick(date)}}/>
          <Filters onFilterChange={ (val) => this.onFilterChange(val) } />
          <Calendar rooms={ this.filteredRooms() } date={ this.state.date }/>
        </div>
      </div>

    </Layout>)
  }

}
