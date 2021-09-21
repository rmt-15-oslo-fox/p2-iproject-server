function time(value){
  return `${value.getHours() < 10 ? `0`+`${value.getHours()}` : value.getHours()}:${value.getMinutes() < 10 ? `0`+`${value.getMinutes()}` : value.getMinutes()}:${value.getSeconds() < 10 ? `0`+`${value.getSeconds()}` : value.getSeconds()}`
}

module.exports=time