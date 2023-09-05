import Dropdown from "../Dropdown"
import { DateTime } from "luxon"
import Page from "./Page"
import { useState } from "react"
export default (props) => {
    const [data, setData] = useState({
        story: props.formOptions.stories[0],
        pub: props.formOptions.publications[0],
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
        story_id: props.idsTable?.stories?.[data.story],
        pub_id: props.idsTable?.publications?.[data.pub],
        date_submitted: data.submitted===""?null:data.submitted,
        date_responded: data.responded===""?null:data.responded,
        response_id: props.idsTable?.responses[data.response]
    }
    console.dir(sendData)
    return <>
    <Page heading="New Submission" >
    <form onSubmit={(event) => { props.handleSubmit(event, 'submission/create', sendData, props.refresh,"SUBMISSIONS") }} >
    <label htmlFor="story">Story: <Dropdown name="story" options={props.formOptions.stories} value={data.story} handleChange={handleChange} /></label>
    <label htmlFor="publication">Publisher: <Dropdown name="publication" options={props.formOptions.publications} value={data.pub} handleChange={handleChange} /></label>
    
    <label htmlFor="submitted">Date submitted:<input type="date" name="submitted" value={data.submitted} onChange={handleChange}></input></label>
    <label htmlFor="responded">Date responded:<input type="date" name="responded" value={data.responded} onChange={handleChange}></input></label>
    <label htmlFor="response">Response:<Dropdown name="response" options={props.formOptions.responses} value={data.response} onChange={handleChange}/></label>
    <button type="submit" >SUBMIT</button>
    </form>
    </Page>
    </>
}