// yahoo finance api
function yahooFinanceApi () {
  let randomNumber = Math.ceil(Math.random()*4)
  if(randomNumber === 1) {
    return 'QFjCk1Q1Kox96QYKbLEf7YMcBqfALBt1eZrgNcpb'
  } else if (randomNumber === 2) {
    return 'Y0Lixb7xv73Jg85WovOsr3SsWBhRlt2DaeRWyKFE'
  } else if (randomNumber === 3) {
    return '6Z2HHk7WHW2SXqNxmQpQeIRMD1JdnTH9xzOPaN76' 
  } else {
    return 'Cx4p0gRZHd7Ul03TyHFSC7oPJqMxPvuR4PZkbm2H'
  }
}

// news api org
function newsApiOrg() {
  return 'f19be7182e244e8fa43049d06f1e2920'
}

module.exports = { yahooFinanceApi, newsApiOrg }