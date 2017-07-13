import Link from 'next/link';
import React from 'react';
import Utils from '../lib/utils';
import Room from './room';
import moment from 'moment';

export default class DatePicker extends React.Component {

  onChange(delta){
    return (e)=>{
      this.props.onPick(moment(this.props.date).add(delta, 'days')._d)
    }
  }

  render(){

    let { date } = this.props
    let title = moment(date).format("MM-D-YYYY")

    return(<div className="date_slider">
      <style jsx>{`
        .minus, .plus {
            cursor: pointer;
            font-size: 24px;
            transition: color 0.2s ease-in-out;
        }
        .minus:hover, .plus:hover {
          color: #00A0DB;
        }
        .title {
          font-size: 30px;
          margin: 0 10px;
        }
        .title_container {
          line-height: 30px;
        }
      `}
      </style>
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="title_container text-center">
            <span className="minus glyphicon glyphicon-arrow-left" onClick={ this.onChange(-1) }></span>
            <span className='title'> { title } </span>
            <span className="plus glyphicon glyphicon-arrow-right" onClick={ this.onChange(1) }></span>
          </div>
        </div>
      </div>
    </div>)
  }

}

