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
    <label htmlFor="stories">Story:<Dropdown name="stories" options={props.formOptions.stories}/></label>
    
    <label htmlFor="publishers">Publisher:<Dropdown name="publishers" options={props.formOptions.stories}/></label>
    
    <label htmlFor="date">Date:<input type="date"></input></label>
    
    </form>
    </Page>
    </>
}