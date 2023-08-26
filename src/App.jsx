import './styles/App.css'
import Sidebar from './components/Sidebar'
import NewSubmission from './components/pages/NewSubmission.jsx'
import NewStory from './components/pages/NewStory'
import Stories from './components/pages/Stories'
import Overview from './components/pages/Overview'
import SingleStory from './components/pages/SingleStory'
import { useState, useEffect } from 'react'
import { API } from './API.mjs'

function App() {
  const [focus, setFocus] = useState("STORIES")
  const [pages, setPages] = useState({
    SUBMIT: <NewSubmission />,
    "NEW STORY": <NewStory />,
    STORIES: <Stories handleClick={handleClick} />,
    OVERVIEW: <Overview handleClick={handleClick} />

  })
  useEffect(() => {
    API.get('stories').then(res => {
      const stories = res.data
      const pairs = {}
      for (const story of stories) {
        pairs[story] = <SingleStory title={story} />
      }
      setPages(prev=>{
        return{
          ...prev,
          ...pairs
        }
      })
    })
  }, [])
  function handleClick(data) {
    if(pages[data]){setFocus(data)}
  }




  return (
    <>
      <div className="main-wrapper">
        <Sidebar setFocus={setFocus} pageKeys={Object.keys(pages)} />
        <div className="middle">
          {pages[focus]}
        </div>
      </div>
    </>


  )
}

export default App
