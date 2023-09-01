import Checkboxes from "../Checkboxes"
import { useState } from "react"
import Page from "./Page.jsx"
export default (props) => {

    const [data, setData] = useState({
        title: "",
        word_count: 0
    })
    const [genres, setGenres] = useState({})
    const handleChange = (event) => {
        const value = event.target.value
        setData({
            ...data,
            [event.target.name]: value
        })

    }
    const handleToggle = (target) => {
        setGenres(prev => {
            return {
                ...prev,
                [target]: !prev[target]
            }
        })
        
    }
    const sendData = {
        ...data,
        ...genres
    }

    return <Page heading="New Story">
    <form onSubmit={(event)=>{props.handleSubmit(event,'story/new',sendData,props.refresh,"STORIES")}}>
        <label htmlFor="title">Title<input name="title" type="text"
            value={data.title}
            onChange={handleChange} /></label>
        
        <label htmlFor="word_count">Wordcount<input name="word_count" type="number"
            value={data.word_count}
            onChange={handleChange} /></label>
        
        <Checkboxes name="genres"
            options={props.formOptions.genres}
            onChange={handleToggle}
            values={genres}
            legend="Genre:"
        />
        <button type="submit">SUBMIT</button>
    </form>
    </Page>

}