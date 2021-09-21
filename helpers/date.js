function date(value){
  return `${value.getFullYear()}-${value.getMonth()+1 < 10 ? `0`+`${value.getMonth()+1}` : value.getMonth()+1}-${value.getDate() < 10 ? `0`+`${value.getDate()}` : value.getDate()}`
}

module.exports=date