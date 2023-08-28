import Checkboxes from "../Checkboxes"
import { useState, useEffect } from "react"
import { API } from "../../API.mjs"
import Page from "./Page.jsx"
export default (props) => {

    const [data, setData] = useState({
        title: "",
        word_count: 0
    })
    const [genres, setGenres] = useState([])
    useEffect(() => {
        setGenres(() => {
            const obj = {}
            props.formOptions.genres.forEach(e => {
                    obj[e] = false
                })
            return obj
        })
    }, [])
    useEffect(() => {
        setData(
            {
                ...data,
                ...genres
            }
        )
    }, [genres])
    useEffect(()=>{
        console.dir(data)
    },[data])

    const handleSubmit = (event) => {
        event.preventDefault()
        API.post("stories", data)
    }
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
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input name="title" type="text"
            value={data.title}
            onChange={handleChange} />
        <label htmlFor="word_count">Wordcount</label>
        <input name="word_count" type="number"
            value={data.word_count}
            onChange={handleChange} />
        <Checkboxes name="genres"
            options={Object.keys(genres)}
            onChange={handleToggle}
            data={data}
            legend="Genre:"
        />
        <button type="submit">SUBMIT</button>
    </form>
    </Page>

}