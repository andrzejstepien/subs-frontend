import { removePairs } from "../../functions/utilities.mjs"
import Page from "./Page"
import Table from "../Table"
export default (props)=>{
    console.dir(props.data)
    const filterList = [
      'Submissions'
    ]
console.log("YOOOO!")
console.dir(props.data)
    

  return  <Page heading="Publications">
            <Table data={removePairs(props.data,filterList)} setFocus={props.setFocus}/>
          </Page>
  
 
}