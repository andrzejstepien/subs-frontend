import Table from "../Table"
import Page from "./Page"
export default (props) => {
    console.dir(props.data)
      const filterList = [
        'Submissions',
        //'ID'
      ]
      

      console.dir(props.setFocus)

    return  <Page heading="Stories" setFocus={props.setFocus}>
              <Table data={props.data} filterList={filterList} setFocus={props.setFocus} />
            </Page>
    
   
}