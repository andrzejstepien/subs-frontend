import Page from "./Page"
import Badges from "../Badges"
import Table from "../Table"
export default (props) => {
    const data = props.data
    console.dir(props.setFocus)
    return <Page heading={data.Title}>
        <div className="singlePageContainer">
            <div className="left">
                <div><h3>ID:</h3> {data.ID}</div>
                <div><h3>Wordcount: </h3> {data.Wordcount}</div>
                <div><h3>Genres: </h3><Badges data={data.Genres} /></div>
            </div>
            <div className="right">
                <h3>Submissions</h3>
                <Table data={data?.Submissions??[]} setFocus={props.setFocus}/>
            </div>
        </div>
    </Page>
}