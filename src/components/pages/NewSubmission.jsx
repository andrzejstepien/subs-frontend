import Dropdown from "../Dropdown"
import Page from "./Page"
import { useState } from "react"
export default (props) => {
    const [data,setData] = useState({
        storyId:null,
        pubId:null,
        date:""
    })


    return <>
    <Page heading="New Submission" >
    <form>
    <label htmlFor="stories">Story:</label>
    <Dropdown name="stories" options={props.formOptions.stories}/>
    <label htmlFor="publishers">Publisher:</label>
    <Dropdown name="publishers" options={props.formOptions.stories}/>
    <label htmlFor="date">Date:</label>
    <input type="date"></input>
    </form>
    </Page>
    </>
}