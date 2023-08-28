import Page from "./Page"
import Dropdown from "../Dropdown"
export default (props) => {
    const data = props.data
    console.dir(data)
    return<Page heading="New Submission">
    <form>
    <label htmlFor="stories">Story:</label>
    <Dropdown name="stories" default={data.Story}/>
    <label htmlFor="publishers">Publisher:</label>
    <Dropdown name="publishers" default={data.Publication}/>
    
    </form>
    </Page>
}