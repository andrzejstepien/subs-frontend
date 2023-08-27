import Table from "../Table"
import Page from "./Page"
import { removePairs } from "../../functions/utilities.mjs"
export default (props) => {
    console.dir(props.data)
      const filterList = [
        'Submissions'
      ]
      

      console.dir(props.setFocus)

    return  <Page heading="Stories" setFocus={props.setFocus}>
              <Table data={removePairs(props.data,filterList)} setFocus={props.setFocus}/>
            </Page>
    
   
}