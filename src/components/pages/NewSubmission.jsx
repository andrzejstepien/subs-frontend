import Dropdown from "../Dropdown"
import Page from "./Page"
export default () => {
    


    return <>
    <Page heading="New Submission">
    <form>
    <label htmlFor="stories">Story:</label>
    <Dropdown name="stories" />
    <label htmlFor="publishers">Publisher:</label>
    <Dropdown name="publishers"/>
    
    </form>
    </Page>
    </>
}