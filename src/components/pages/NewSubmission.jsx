import Dropdown from "../Dropdown"
import { DateTime } from "luxon"
import Page from "./Page"
import { useState } from "react"
export default (props) => {
    const [data, setData] = useState({
        story: "",
        pub: "",
        queryAfter: 90,
        submitted: DateTime.now().toFormat('yyyy-MM-dd'),
        responded: null,
        response: 'Pending'
    })
    const handleChange = (event) => {
        const value = event.target.value
        setData({
            ...data,
            [event.target.name]: value
        })
    }
    console.dir(props.idsTable)
    const sendData = {
        story_id: props.idsTable?.story[data.story],
        pub_id: props.idsTable?.pub[data.pub],
        date_submitted: data.submitted,
        date_responded: data.responded,
        response_id: props.idsTable?.response[data.response]
    }
    console.dir(sendData)
    return <>
    <Page heading="New Submission" >
    <form onSubmit={(event) => { props.handleSubmit(event, 'submission/new', sendData, props.refresh) }} >
    <label htmlFor="story">Story:<Dropdown name="story" options={props.formOptions.stories} onChange={handleChange}/></label>
    
    <label htmlFor="pub">Publisher:<Dropdown name="pub" options={props.formOptions.pubs} onChange={handleChange}/></label>
    
    <label htmlFor="date">Date submitted:<input type="date" value={data.submitted} onChange={handleChange}></input></label>
    <label htmlFor="date">Date responded:<input type="date" value={data.responded} onChange={handleChange}></input></label>
    <label htmlFor="response">Response:<Dropdown name="publishers" options={props.formOptions.responses} value={data.response} onChange={handleChange}/></label>
    <button type="submit" >SUBMIT</button>
    </form>
    </Page>
    </>
}