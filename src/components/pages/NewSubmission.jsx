import Dropdown from "../Dropdown"
import { DateTime } from "luxon"
import Page from "./Page"
import { useState } from "react"
export default (props) => {
    const [data, setData] = useState({
        story: props.formOptions.stories[0],
        pub: props.formOptions.pubs[0],
        queryAfter: 90,
        submitted: DateTime.now().toFormat('yyyy-MM-dd'),
        responded: "",
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
        date_submitted: data.submitted===""?null:data.submitted,
        date_responded: data.responded===""?null:data.responded,
        response_id: props.idsTable?.response[data.response]
    }
    console.dir(sendData)
    return <>
    <Page heading="New Submission" >
    <form onSubmit={(event) => { props.handleSubmit(event, 'submission/new', sendData, props.refresh) }} >
    <label htmlFor="stories">Story: <Dropdown name="story" options={props.formOptions.stories} value={data.story} handleChange={handleChange} /></label>
    <label htmlFor="publishers">Publisher: <Dropdown name="pub" options={props.formOptions.pubs} value={data.pub} handleChange={handleChange} /></label>
    
    <label htmlFor="submitted">Date submitted:<input type="date" name="submitted" value={data.submitted} onChange={handleChange}></input></label>
    <label htmlFor="responded">Date responded:<input type="date" name="responded" value={data.responded} onChange={handleChange}></input></label>
    <label htmlFor="response">Response:<Dropdown name="publishers" options={props.formOptions.responses} value={data.response} onChange={handleChange}/></label>
    <button type="submit" >SUBMIT</button>
    </form>
    </Page>
    </>
}