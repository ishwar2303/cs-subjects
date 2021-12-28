const roundOffAmount = (amount) => {
    console.log(amount)
    var curr = ''
    if(amount >= 1000000000) {
      amount /= 1000000000
      curr = 'B'
    }
    else if(amount >= 1000000) {
      curr = 'M'
      amount /= 1000000
    }
    else if(amount >= 1000) {
      curr = 'K'
      amount /= 1000
    }
    else return {
      curr,
      amount
    }
    amount = amount*100 + 0.5
    amount = parseInt(amount)
    amount /= 100
    return {
      curr,
      amount
    }
  }e