import { DateTime, Interval } from 'luxon'
export const removePairs = (array,keys) => {
    const copy = array.map(a => Object.assign({}, a));
    return copy.map(e=>{
      for (const key of keys) {
        delete e[key]
      }
      return e
    })
  }

  export const daysSince = (str,str2) => {
    const then = DateTime.fromFormat(str,"dd/MM/yyyy")  
    const now = str2?DateTime.fromFormat(str2,"dd/MM/yyyy"):DateTime.local()
    return Interval.fromDateTimes(then,now).count('days')
  }

  export const renderClassNames = (array) => {
    let string = ""
    for (const className of array) {
      string = string+className+" "
    }
    return string
  }