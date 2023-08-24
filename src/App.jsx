import './App.css'
import Table from './components/Table'
import { API } from './API.mjs'
import { useState, useEffect } from 'react'

function App() {
    const [data,setData] = useState([{}])
   useEffect(()=>{
     API.get("submissions").then(res=>{setData(res.data)})
   },[])
 

  

  return (
    
      <Table data={data}/>
    
  )
}

export default App
