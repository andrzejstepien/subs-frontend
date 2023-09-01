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
    const handleChange = (event) => {
        const value = event.target.value
        setData({
            ...data,
            [event.target.name]: value
        })

    }
    const handleToggle = (target) => {
        setData(prev => {
            return {
                ...prev,
                [target]: !prev[target]
            }
        })
        
    }

    return <Page heading={`EDIT STORY #${props.data.ID}`}>
    <form onSubmit={(event)=>{props.handleSubmit(event,'story/edit',data,props.refresh)}}>
        <label htmlFor="title">Title<input name="title" type="text"
            value={data.title}
            onChange={handleChange} /></label>
        
        <label htmlFor="word_count">Wordcount<input name="word_count" type="number"
            value={data.word_count}
            onChange={handleChange} /></label>
        
        <Checkboxes name="genres"
            options={props.formOptions.genres}
            onChange={handleToggle}
            values={props.data.Genres}
            legend="Genre:"
        />
        <button type="submit">SUBMIT</button>
    </form>
    </Page>

}