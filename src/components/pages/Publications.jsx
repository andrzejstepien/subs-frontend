import { removePairs } from "../../functions/utilities.mjs"
import Page from "./Page"
import Table from "../Table"
export default (props)=>{
    console.dir(props.data)
    const filterList = [
      'Submissions',
      "ID"
    ]
console.log("YOOOO!")
console.dir(props.data)
    

  return  <Page heading="Publications">
            <Table data={removePairs(props.data,filterList)} setFocus={props.setFocus} setState={props.setState}/>
          </Page>
  
 
}