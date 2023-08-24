import Checkboxes from "./Checkboxes" 
import { useState } from "react"
import { API } from "../API.mjs"
export default () => {

    const [data,setData] = useState({
        title:"",
        word_count:0
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const word_count = event.target.word_count.value
        API.post("stories",data)
    }
    const handleChange = (event) => {
        const value = event.target.value
        setData({
            ...data,
            [event.target.name]:value
        })
    }

    return <form onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <input name="title" type="text" 
    value={data.title} 
    onChange={handleChange}/>
    <label htmlFor="word_count">Wordcount</label>
    <input name="word_count" type="number"
    value={data.word_count}
    onChange={handleChange}/>
    <Checkboxes name="genres"/>
    <button type="submit">SUBMIT</button>
    </form>
    
    
}