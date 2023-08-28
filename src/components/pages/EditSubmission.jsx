import Page from "./Page"
import Dropdown from "../Dropdown"
export default (props) => {
    const data = props.data
    console.dir(data)
    return<Page heading="Edit Submission">
    <form>
        <div>
        <label htmlFor="stories">Story:</label>
    <Dropdown name="stories" options={props.formOptions.stories} default={data.Story}/>
    <label htmlFor="publishers">Publisher:</label>
    <Dropdown name="publishers" options={props.formOptions.pubs} default={data.Publication}/>
        </div>
    
    <label htmlFor="queryAfter">Query After:</label>
    <input type="number" name="queryAfter" value={data['Query After']}></input>
    <label htmlFor="submitted">Submitted::</label>
    <input type="date" name="submitted" value={data['Submitted']}></input>
    <label htmlFor="responded">Responded:</label>
    <input type="date" name="responded" value={data['Responded']}></input>
    <label htmlFor="response">Response:</label>
    <input type="text" name="response" value={data['Responded']}></input>
    <div>
    <button type="submit">SUBMIT</button>
    </div>
    </form>
    </Page>
}