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
  const [pageMatrix, setPageMatrix] = useState({
    SUBMIT: <NewSubmission />,
    "NEW STORY": <NewStory />,
    STORIES: <Stories setFocus={setFocus} />,
    OVERVIEW: <Overview setFocus={setFocus} />
  })
  const [storiesPageData,setStoriesPageData] = useState([])
  
  useEffect(() => {

    API.get('page/stories').then(res=>{
      const rows = res.data
      setStoriesPageData(rows)
      const pages = {}
      for (const row of rows) {
        pages[row.Title] = <SingleStory data={row}/>
      }
      setPageMatrix(prev=>{
        return{
          ...prev,
          ...pages
        }
      })
      console.dir(pageMatrix)
    })
  }, [])





  


  return (
    <>
      <div className="main-wrapper">
        <Sidebar setFocus={setFocus} pageKeys={Object.keys(pageMatrix).slice(0,4)} />
        <div className="middle">
          {pageMatrix[focus]}
        </div>
      </div>
    </>


  )
}

export default App
