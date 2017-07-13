import Link from 'next/link';
import React from 'react';
import Utils from '../lib/utils';

export default class Filters extends React.Component {

  onChange(e){
    let val = e.target.value
    this.props.onFilterChange(val)
  }

  render(){

    return(<div className="date_slider">
      <style jsx>{`
      `}
      </style>
        <div className="form-group">
          <div className="input-group">
            <input onChange={(e)=> this.onChange(e)}type="text" className="form-control" placeholder="Search by any criteria..."/>
            <div className="input-group-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></div>
          </div>
        </div>
    </div>)
  }

}
