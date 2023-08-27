export const removePairs = (array,keys) => {
    return array.map(e=>{
      for (const key of keys) {
        delete e[key]
      }
      return e
    })
  }