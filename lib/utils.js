import moment from 'moment';
import 'isomorphic-fetch';

const colors = {
  blue: "#00A0DB",
  dark_blue: "#362A83",
  purple: "#A01F80",
  magenta: "#E40274",
  red: "#E31E2F",
  orange: "#EC7B23",
  yellow: "#FFE900",
  green: "#9ABD36",
  dark_green: "#009547"
}

const imageURL = function(path){
  return `https://challenges.1aim.com/roombooking/${path}`
}

const normalizeTime = (string) => {
  let hour = string.split(":")[0]
  let min = string.split(":")[1]
  return Number((hour * 60)) + Number(min)
}

const filter = (room, text) => {
  if(!text || text.length < 3) {
    return true
  }
  let isName = /(\d+\.\d+)/
  let isTime = /(\d{2}:\d{2})/
  let isSize = /(\d{2,3}) m2/
  let isCapacity = /(\d{1,3}) peop/
  if(isName.test(text)){
    return (room.name.indexOf(text) != -1)
  } else if(isTime.test(text)){
    let avail = false
    let time = normalizeTime(text.match(isTime)[1])

    room.avail.map((range)=>{
      min = range.split("-")[0]
      max = range.split("-")[1]
      avail = avail || (normalizeTime(min) < time && normalizeTime(max) > time)
    })
    return avail
  } else if(isSize.test(text)){
    let size = text.split(" ")[0]
    return room.size.replace("m2", "") > size
  } else if(isCapacity.test(text)){
    let capacity = text.split(" ")[0]
    return room.capacity > capacity
  }
  return false;
}

const between = (n, a, z)=>(n >= a && n <= z)

const getRooms = async function(params){
  let response = await fetch(`https://challenges.1aim.com/roombooking/getrooms`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept':  'application/json'
    },
    body: JSON.stringify(params)
  })

  let json = await response.json()
  return json;
}

const toDate = function(date, time){
  let hour = time.split(":")[0]
  let minute  = time.split(":")[1]
  return moment(date).startOf('day').hour(hour).minute(minute)
}

const submitBooking = async function(params){

  let response = await fetch(`https://challenges.1aim.com/roombooking/sendpass`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept':  'application/json'
    },
    body: JSON.stringify(params)
  })

  if(response.status == 500){
    return {error: { text: "Server has responded with 500 Internal Error."}}
  }
  let json = await response.json()
  return json;
}

export default {
  colors: colors,
  imageURL: imageURL,
  filter: filter,
  normalizeTime: normalizeTime,
  between: between,
  getRooms: getRooms,
  toDate: toDate,
  submitBooking: submitBooking,
}