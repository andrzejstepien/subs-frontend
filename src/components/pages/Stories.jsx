import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
import Page from "./Page"
export default (props) => {
    const [data,setData] = useState([{}])
    
    useEffect(()=>{
      API.get("page/stories").then(res=>{
        console.dir(res.data)
        return setData(res.data)
      })  
      },[])

      



    return  <Page heading="Stories">
              <Table data={data} handleClick={props.handleClick}/>
            </Page>
    
   
}