const data = {
  "ASII.JK": {
    "symbol": "ASII.JK",
    "close": [
      5100,
      5075,
      5150,
      5050,
      5275,
      5175,
      5250,
      5350,
      5425,
      5350,
      5250,
      5450,
      5425,
      5450,
      5525,
      5400,
      5375,
      5425,
      5300,
      5225
    ],
    "timestamp": [
      1629684000,
      1629770400,
      1629856800,
      1630029600,
      1630288800,
      1630461600,
      1630548000,
      1630634400,
      1630893600,
      1630980000,
      1631066400,
      1631152800,
      1631239200,
      1631498400,
      1631584800,
      1631671200,
      1631757600,
      1631844000,
      1632103200,
      1632210600
    ],
    "end": null,
    "start": null,
    "previousClose": null,
    "chartPreviousClose": 5100,
    "dataGranularity": 300
  }
}

let a = 'ASII.JK'
let timeSt = data[a].timestamp[3]

// timeSt.forEach(element => {
//   element = new Date(element*1000)
// });

let newDate = new Date(timeSt * 1000)
let formattedDate = newDate.getDate() + '/' + newDate.getMonth()

let formattedTime = newDate.getHours() 

console.log(formattedTime)