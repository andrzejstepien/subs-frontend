import Checkboxes from "../Checkboxes"
import { useState } from "react"
import Page from "./Page.jsx"
export default (props) => {
    console.dir(props.data)
    const [data, setData] = useState({
        id:props.data.ID,
        title: props.data.Title,
        word_count: props.data.Wordcount
    })
    console.dir(props.data.Genres)
    const [genres, setGenres] = useState(()=>{
        const obj = {}
        for(const genre of props.data.Genres){
            obj[genre]=true
        }
        return obj
    })
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
console.dir(genres)
console.dir(props.formOptions.genres)
    return <Page heading={`EDIT STORY #${props.data.ID}`}>
    <form onSubmit={(event)=>{props.handleSubmit(event,'story/edit',sendData,props.refresh,"STORIES")}}>
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