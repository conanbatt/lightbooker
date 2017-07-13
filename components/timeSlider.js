import Link from 'next/link';
import React from 'react';
import Utils from '../lib/utils';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default class TimeSlider extends React.Component {

  position(time){
    return (Utils.normalizeTime(time) - 420)/7.2
  }

  onChange(vals){
    this.props.onTimePick({from: this.formatter(vals[0]), to: this.formatter(vals[1])})
  }

  formatter(value){
    let hour = Math.floor((value * 15) / 60) + 7
    return `${hour < 10 ? "0" + hour : hour}:${(value * 15) % 60 || "00"}`
  }

  render(){

    let { availabilities, booking } = this.props;

    let bookingSelector;
    let pins;
    let picker;

    if(booking.to && booking.from){
      let bookerStyle = {
        left:  this.position(booking.from) + "%",
        right: 100 - this.position(booking.to) + "%",
        position: "absolute",
      }
      picker = <Range min={0} max={48}
        value={[(Utils.normalizeTime(booking.from) - 420)/15, (Utils.normalizeTime(booking.to) - 420)/15]}
        tipFormatter={value => this.formatter(value)}
        onChange={(vals) => this.onChange(vals)}
      />
      bookingSelector = <div className="bg-yellow" style={bookerStyle}>
        <style jsx>{`
          .bg-yellow {
            background: #FFE900;
            height: 15px;
            top: 0;
            transition: all 0.5s ease-in-out;
            opacity: 0.7;
          }
          `}</style>
      </div>
    }

    return(<div className="time_slider">
      <style jsx>{`
        .bar {
            position: relative;
            height: 15px;
            margin: 10px 15px;
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
        .slider_container {
            margin: 0 20px;
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
      <div className="slider_container">
        { picker }
      </div>
    </div>)
  }

}
