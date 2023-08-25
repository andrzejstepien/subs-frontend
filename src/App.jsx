import './App.css'
import Sidebar from './components/Sidebar'
import NewSubmission from './components/pages/NewSubmission.jsx'
import NewStory from './components/pages/NewStory'
import Stories from './components/pages/Stories'
import Overview from './components/pages/Overview'
import { useState, useEffect } from 'react'

function App() {
    const [focus,setFocus] = useState("STORIES")
    const pages = {
      SUBMIT:<NewSubmission/>,
      "NEW STORY":<NewStory/>,
      STORIES:<Stories/>,
      OVERVIEW:<Overview/>

    }

   

  

  return (
    <>
      <div className="main-wrapper">
      <Sidebar setFocus={setFocus} pageKeys={Object.keys(pages)}/> 
      <div className="middle">
      {pages[focus]}
      </div>
      </div>
    </>
      
    
  )
}

export default App
