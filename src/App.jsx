import './styles/App.css'
import Sidebar from './components/Sidebar'
import NewSubmission from './components/pages/NewSubmission.jsx'
import NewStory from './components/pages/NewStory'
import Stories from './components/pages/Stories'
import Submissions from './components/pages/Submissions'
import SingleStory from './components/pages/SingleStory'
import SinglePublication from './components/pages/SinglePublication'
import Publications from './components/pages/Publications'
import EditSubmission from './components/pages/EditSubmission'
import { daysSince } from './functions/utilities.mjs'
import { useState, useEffect } from 'react'
import { API } from './API.mjs'

function App() {
  const [submissionsData,setSubmissionsData] = useState([{}])
  const [storiesPageData, setStoriesPageData] = useState([])
  const [pubsPageData, setPubsPageData] = useState([1,1,1])
  const [focus, setFocus] = useState("SUBMISSIONS")
  const [pageDirectory, setPageDirectory] = useState([])
  const sidebarPages = {
  SUBMISSIONS: <Submissions data={submissionsData} setFocus={setFocus} />,
  STORIES: <Stories data={storiesPageData} setFocus={setFocus} />,
  PUBLICATIONS: <Publications data={pubsPageData} setFocus={setFocus} />,
  SUBMIT: <NewSubmission />,
  "NEW STORY": <NewStory />}




  useEffect(() => {
    API.get('page/stories').then(res => {
      const rows = res.data
      setStoriesPageData(rows)
    })
    API.get('page/pubs').then(res=>{
      const rows = res.data
      setPubsPageData(rows)
    })
    API.get("submissions").then(res=>{
      setSubmissionsData(prev=>{
        return res.data.map(e=>{
          e['Days Out'] = e.Response==="Pending"?daysSince(e.Submitted):daysSince(e.Submitted,e.Responded)
          e.Edit = <button onClick={()=>{setFocus(e.id)}}>EDIT</button>
          return e
        })
      })
    })
  },[])
  useEffect(() => {
    const pages = {}
      for (const row of storiesPageData) {
        pages[row.Title] = <SingleStory data={row} setFocus={setFocus}/>
      }
      setPageDirectory(prev=>{
        return{
          ...prev,
          ...pages
        }
      })
  },[storiesPageData])
  useEffect(()=>{
    const pages = {}
    for (const row of pubsPageData) {
      pages[row.Title] = <SinglePublication data={row} setFocus={setFocus}/>
    }
    setPageDirectory(prev=>{
      return{
        ...prev,
        ...pages
      }
    })
  },[pubsPageData])
  useEffect(()=>{
    const pages = {}
    for (const row of submissionsData) {
      pages[row.id] = <EditSubmission data={row} />
    }
    setPageDirectory(prev=>{
      return{
        ...prev,
        ...pages
      }
    })
    
  },[submissionsData])
 





  return (
    <>
      <div className="main-wrapper">
        <Sidebar setFocus={setFocus} pageKeys={Object.keys(sidebarPages).slice(0, 5)} />
        <div className="middle">
          {sidebarPages[focus]??pageDirectory[focus]}
        </div>
      </div>
    </>


  )
}

export default App
