import Table from "../Table"
import Page from "./Page"
import { removePairs } from "../../functions/utilities.mjs"
export default (props) => {
   
      const filterList = [
        'Submissions']
      

      

    return  <Page heading="Stories">
              <Table data={removePairs(props.data,filterList)} setFocus={props.setFocus}/>
            </Page>
    
   
}