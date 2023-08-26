import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
import Page from "./Page"
export default (props) => {
    const [data,setData] = useState([{}])
    
    useEffect(()=>{
      API.get("page/stories").then(res=>{
        console.dir(res.data)
        return setData(removePairs(res.data,filterList))
      })  
      },[])

      const filterList = [
        'Submissions']
      

      const removePairs = (array,keys) => {
        return array.map(e=>{
          for (const key of keys) {
            delete e[key]
          }
          return e
        })
      }

    return  <Page heading="Stories">
              <Table data={data} setFocus={props.setFocus}/>
            </Page>
    
   
}