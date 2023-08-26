import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
import Page from "./Page.jsx"
export default (props) => {
    const [data,setData] = useState([{}])
    const [stories,setStories] = useState()
    useEffect(()=>{
        API.get("submissions").then(res=>{setData(res.data)})
      },[])
  



    return <Page heading="Overview">
      <Table data={data} handleClick={props.handleClick}/>
    </Page>
    
}