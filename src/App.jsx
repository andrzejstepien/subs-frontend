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
  const [storiesPageData, setStoriesPageData] = useState([])
  const [focus, setFocus] = useState("STORIES")
  const [pageMatrix, setPageMatrix] = useState({})


  useEffect(() => {

    API.get('page/stories').then(res => {
      const rows = res.data
      setStoriesPageData(rows)
      
    })
  }, [])
  useEffect(() => {
    const pages = {}
      for (const row of storiesPageData) {
        pages[row.Title] = <SingleStory data={row} />
      }
      setPageMatrix(prev => {
        return {
          SUBMIT: <NewSubmission />,
          "NEW STORY": <NewStory />,
          STORIES: <Stories data={storiesPageData} setFocus={setFocus} />,
          OVERVIEW: <Overview setFocus={setFocus} />,
          ...pages
        }
      })
      console.dir(pageMatrix)
  },[storiesPageData])







  return (
    <>
      <div className="main-wrapper">
        <Sidebar setFocus={setFocus} pageKeys={Object.keys(pageMatrix).slice(0, 4)} />
        <div className="middle">
          {pageMatrix[focus]}
        </div>
      </div>
    </>


  )
}

export default App
