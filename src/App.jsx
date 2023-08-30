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
import Spinner from './components/Loader'
import { daysSince } from './functions/utilities.mjs'
import { useState, useEffect } from 'react'
import { API } from './API.mjs'

function App() {
  const [isWaiting, setIsWaiting] = useState(false)
  const [idsTable, setIdsTable] = useState({})
  const [submissionsData, setSubmissionsData] = useState([{}])
  const [storiesPageData, setStoriesPageData] = useState([])
  const [pubsPageData, setPubsPageData] = useState([1, 1, 1])
  const [focus, setFocus] = useState("SUBMISSIONS")
  const [pageDirectory, setPageDirectory] = useState([])
  const [formOptions, setFormOptions] = useState({})
  const sidebarPages = {
    SUBMISSIONS: <Submissions data={submissionsData} setFocus={setFocus} />,
    STORIES: <Stories data={storiesPageData} setFocus={setFocus} />,
    PUBLICATIONS: <Publications data={pubsPageData} setFocus={setFocus} />,
    SUBMIT: <NewSubmission formOptions={formOptions} />,
    "NEW STORY": <NewStory formOptions={formOptions} />
  }
  const getStoriesPageData = () => {
    API.get('page/stories').then(res => {
      const rows = res.data.map(e => {
        e.Subs = e.Submissions.length
        e.Edit = <button onClick={() => { setFocus(`EDITSTORY${e.id}`) }}>EDIT</button>
        return e
      })
      setStoriesPageData(rows)
    })
  }
  const getPubsPageData = () => {
    API.get('page/pubs').then(res => {
      const rows = res.data.map(e => {
        e.Subs = e.Submissions.length
        e.Edit = <button onClick={() => { setFocus(`EDITPUB${e.id}`) }}>EDIT</button>
        return e
      })
      setPubsPageData(rows)
    })
  }
  const getSubmissionsData = () => {
    API.get("submissions").then(res => {
      setSubmissionsData(prev => {
        return res.data.map(e => {
          e['Days Out'] = e.Response === "Pending" ? daysSince(e.Submitted) : daysSince(e.Submitted, e.Responded)
          e.Edit = <button onClick={() => { setFocus(`EDITSUB${e.id}`) }}>EDIT</button>
          return e
        })
      })
    })
  }
  const getFormOptions = () => {
    API.get("formOptions").then(res => {
      setFormOptions(res.data)
    })
  }
  const getIdsTable = () => {
    API.get("idsTable").then(res => {
      setIdsTable(res.data)
    })
  }
  const addPagesToDirectory = (array, fn) => {
    const pages = {}
    for (const row of array) {
      fn(row, pages)
    }
    setPageDirectory(prev => {
      return {
        ...prev,
        ...pages
      }
    })
  }
  const addStoryPagesToDirectory = () => {
    addPagesToDirectory(
      storiesPageData,
      (row, pages) => { return pages[row.Title] = <SingleStory data={row} setFocus={setFocus} /> })
  }
  const addPubPagesToDirectory = () => {
    addPagesToDirectory(
      pubsPageData,
      (row, pages) => { return pages[row.Title] = <SinglePublication data={row} setFocus={setFocus} /> }
    )
  }
  const addSubPagesToDirectory = () => {
    addPagesToDirectory(
      submissionsData,
      (row, pages) => { return pages[`EDITSUB${row.id}`] = <EditSubmission data={row} formOptions={formOptions} idsTable={idsTable} refresh={getSubmissionsData} handleSubmit={handleSubmit}/> }
    )
  }
  useEffect(() => {
    getStoriesPageData()
    getPubsPageData()
    getSubmissionsData()
    getFormOptions()
    getIdsTable()
  }, [])
  useEffect(() => {
    addStoryPagesToDirectory()
  }, [storiesPageData])
  useEffect(() => {
    addPubPagesToDirectory()
  }, [pubsPageData])
  useEffect(() => {
    addSubPagesToDirectory()
  }, [submissionsData])
  const handleSubmit = async (event,endpoint,sendData,refresh) => {
    event.preventDefault()
    try {
      setIsWaiting(true)
      const res = await API.post(endpoint, sendData)
      console.log(res)
    } catch (error) {
      console.error()
    } finally { 
      await refresh() 
      setIsWaiting(false)
      setFocus("SUBMISSIONS")
    }
  }






  return (
    <>
      <div className="main-wrapper">
        {isWaiting&&<Spinner/>}
        <Sidebar setFocus={setFocus} pageKeys={Object.keys(sidebarPages).slice(0, 5)} />
        <div className="middle">
          {sidebarPages[focus] ?? pageDirectory[focus]}
        </div>
      </div>
    </>


  )
}

export default App
