import { API } from '../../API.mjs'
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
    useEffect(() => {
        console.dir(data)
    }, [data])

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
        <form onSubmit={(event) => { props.handleSubmit(event, 'submission/edit', sendData, props.refresh) }}>
            <div className='form-row'>
                <label htmlFor="stories">Story: <Dropdown name="stories" options={props.formOptions.stories} value={data.story} handleChange={handleChange} /></label>
                
            </div>
            <div className='form-row'>
                <label htmlFor="publishers">Publisher: <Dropdown name="publishers" options={props.formOptions.pubs} value={data.pub} handleChange={handleChange} /></label>
                
            </div>
            <div className='form-row'>
                <label htmlFor="queryAfter">Query After: <input type="number" name="queryAfter" value={data.queryAfter} onChange={handleChange}></input></label>
                
            </div>
            <div className='form-row'>
                <label htmlFor="submitted">Submitted: <input type="date" name="submitted" value={data.submitted ?? ""} onChange={handleChange}></input></label>
                
            </div>
            <div className='form-row'>
                <label htmlFor="responded">Responded: <input type="date" name="responded" value={data.responded ?? ""} onChange={handleChange}></input></label>
                
            </div>
            <div className='form-row'>
                <label htmlFor="response">Response: <Dropdown name="response" options={props.formOptions.responses} value={data.response} handleChange={handleChange} /></label>
                
            </div>

            <div className='form-row'>
                <button type="submit" >SUBMIT</button>
            </div>
        </form>
    </Page>
}