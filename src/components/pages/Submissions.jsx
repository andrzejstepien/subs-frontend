import Table from "../Table"
import Page from "./Page.jsx"
export default (props) => {
    const filterList=[
      "id",
      "Query After"
    ]
    const highlights =[
      ['Response','Pending']
    ]
    const data = props.data 
    return <Page heading="Submissions">
      <Table data={data} filterList={filterList} setFocus={props.setFocus} highlights={highlights}/>
    </Page>
    
}