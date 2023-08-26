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
  const [storiesPageData,setStoriesPageData] = useState([])
  
  useEffect(() => {

    API.get('page/stories').then(res=>{
      const rows = res.data
      setStoriesPageData(rows)
      const pages = {}
      for (const row of rows) {
        pages[row.Title] = <SingleStory data={row} />
      }
      setPages(prev=>{
        return{
          ...prev,
          ...pages
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
