export const removePairs = (array,keys) => {
    const copy = array.map(a => Object.assign({}, a));
    return copy.map(e=>{
      for (const key of keys) {
        delete e[key]
      }
      return e
    })
  }