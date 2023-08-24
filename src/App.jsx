import './App.css'
import Table from './components/Table'
import Sidebar from './components/Sidebar'
import NewSubmission from './components/NewSubmission.jsx'
import NewStory from './components/NewStory'
import { API } from './API.mjs'
import { useState, useEffect } from 'react'

function App() {
    const [data,setData] = useState([{}])
    const [focus,setFocus] = useState("MAIN")
    const pages = {
      MAIN:<Table data={data}/>,
      SUBMIT:<NewSubmission/>,
      "NEW STORY":<NewStory/>

    }
   useEffect(()=>{
     API.get("submissions").then(res=>{setData(res.data)})
   },[])
   const changeFocus = (focus) => {
    setFocus(focus)
   }

  

  return (
    <>
      <div className="main-wrapper">
      <Sidebar changeFocus={changeFocus} pageKeys={Object.keys(pages)}/> 
      <div className="middle">
      {pages[focus]}
      </div>
      </div>
    </>
      
    
  )
}

export default App
