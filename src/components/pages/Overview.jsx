import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
export default () => {
    const [data,setData] = useState([{}])
    const [stories,setStories] = useState()
    useEffect(()=>{
        API.get("submissions").then(res=>{setData(res.data)})
      },[])
  



    return <Table data={data}/>
}