import Page from "./Page"
import Table from "../Table"
import Badges from "../Badges"
export default (props) => {
    const data = props.data
    console.dir(data)
    return <Page heading={data.Title}>
    <div className="singlePageContainer">
        
        <div className="left">
            <div><h3>ID:</h3> {data.ID}</div>
            <div><h3>Genres: </h3><Badges data={data.Genres} /></div>
            <div><a href={data.Website}>Website</a></div>
        </div>
        <div className="right">
            <h3>Submissions</h3>
            <Table data={data?.Submissions??[]} setFocus={props.setFocus}/>
        </div>
    </div>
</Page>
}