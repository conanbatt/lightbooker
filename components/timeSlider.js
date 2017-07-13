import Link from 'next/link';
import React from 'react';
import Utils from '../lib/utils';

export default class TimeSlider extends React.Component {

  onChange(binding){
    let val = e.target.value
    this.props.onFilterChange(val)
  }

  position(time){
    return (Utils.normalizeTime(time) - 420)/7.2
  }

  render(){

    let { availabilities, booking } = this.props;

    let bookingSelector;
    if(booking.to && booking.from){
      let bookerStyle = {
        left:  this.position(booking.from) + "%",
        right: 100 - this.position(booking.to) + "%",
        position: "absolute",
      }
      bookingSelector = <div className="bg-yellow" style={bookerStyle}>
        <style jsx>{`
          .bg-yellow {
            background: #FFE900;
            height: 15px;
            top: 0;
          }
          `}</style>
      </div>
    }

    return(<div className="time_slider">
      <style jsx>{`
        .bar {
            position: relative;
            height: 15px;
            margin: 20px 15px;
        }
        .bg-red {
            background: #E31E2F;
        }
        .bg-green {
            background: #9ABD36;
            height: 15px;
            top: 0;
        }

        .label {
            position: absolute;
            top: -15px;
            color: #444;
            left: -20px;
        }
        .label.last {
            right: -20px;
            left: auto;
        }
        .hour_blocks {
          position: relative;
          display: flex;
          height: 15px;
        }
        .hour_block {
            flex: 1;
            flex-grow: 1;
            border-right: 1px solid white;
            box-sizing: border-box;
            position: relative;
        }
        .hour_block:last-child {
          border-right: 0;
        }
      `}
      </style>
      <div className="bar bg-red">
        { availabilities.map((block,i)=>{
          let frm = block.split("-")[0]
          let to = block.split("-")[1]
          let style = {
            left: this.position(frm) + "%",
            right: (100 - this.position(to)) + "%",
            position: "absolute"
          }
          return <div key={i} className="bg-green" style={style}>
          </div>
        }) }
        { bookingSelector }
        <div className="hour_blocks">
          { [...Array(12)].map((_,i)=>{
            return (<div key={i} className="hour_block">
              { i == 11 ? <div className="label last"> 19:00</div> : null }
              <div className="label"> {i + 7 < 10 ? `0${i + 7}` : i + 7}:00</div>
            </div>)
          })}
        </div>
      </div>
    </div>)
  }

}
