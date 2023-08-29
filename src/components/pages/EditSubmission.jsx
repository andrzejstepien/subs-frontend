import {API} from '../../API.mjs'
import Page from "./Page"
import Dropdown from "../Dropdown"
import { useState, useEffect } from "react"
import Spinner from '../Loader'
export default (props) => {
    const [data, setData] = useState({
        id: props.data.id,
        story: props.data.Story,
        pub: props.data.Publication,
        queryAfter: props.data['Query After'],
        submitted: props.data['Submitted'],
        responded: props.data['Responded'],
        response: props.data.Response
    })
    useEffect(()=>{
        console.dir(data)
    },[data])
    
    const handleChange = (event) => {
        const value = event.target.value
        setData({
            ...data,
            [event.target.name]: value
        })
        }

        const sendData = {
            id: props.data.id,
            story_id: props.idsTable.story[data.story],
            pub_id: props.idsTable.pub[data.pub],
            date_submitted: data.submitted,
            date_responded: data.responded,
            response_id: props.idsTable.response[data.response]
        }
       

    return <Page heading={`Edit Submission #${props.data.id}`}>
        <form onSubmit={(event)=>{props.handleSubmit(event,'submission/edit',sendData,props.refresh)}}>
            <div>
                <label htmlFor="stories">Story:</label>
                <Dropdown name="stories" options={props.formOptions.stories} value={data.story} handleChange={handleChange} />
                <label htmlFor="publishers">Publisher:</label>
                <Dropdown name="publishers" options={props.formOptions.pubs} value={data.pub} handleChange={handleChange} />
            </div>

            <label htmlFor="queryAfter">Query After:</label>
            <input type="number" name="queryAfter" value={data.queryAfter} onChange={handleChange}></input>
            <label htmlFor="submitted">Submitted::</label>
            <input type="date" name="submitted" value={data.submitted??""} onChange={handleChange}></input>
            <label htmlFor="responded">Responded:</label>
            <input type="date" name="responded" value={data.responded??""} onChange={handleChange}></input>
            <label htmlFor="response">Response:</label>
            <Dropdown name="response" options={props.formOptions.responses} value={data.response} handleChange={handleChange} />
            <div>
                <button type="submit" >SUBMIT</button>
            </div>
        </form>
    </Page>
}