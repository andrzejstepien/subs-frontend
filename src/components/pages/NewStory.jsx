import Checkboxes from "../Checkboxes"
import { useState } from "react"
import Page from "./Page.jsx"
export default (props) => {

    const [data, setData] = useState({
        title: "",
        word_count: 0
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

    return <Page heading="New Story">
    <form onSubmit={(event)=>{props.handleSubmit(event,'story/new',data,props.refresh,"STORIES")}}>
        <label htmlFor="title">Title<input name="title" type="text"
            value={data.title}
            onChange={handleChange} /></label>
        
        <label htmlFor="word_count">Wordcount<input name="word_count" type="number"
            value={data.word_count}
            onChange={handleChange} /></label>
        
        <Checkboxes name="genres"
            options={props.formOptions.genres}
            onChange={handleToggle}
            data={data}
            legend="Genre:"
        />
        <button type="submit">SUBMIT</button>
    </form>
    </Page>

}