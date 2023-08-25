import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
export default () => {
    const [data,setData] = useState([{}])
    const [stories,setStories] = useState()
    useEffect(()=>{
        API.get('stories')
        API.get("stories/full").then(res=>{setData(res.data)})
      },[])
    useEffect(()=>{
        
    },[data])



    return <Table data={data}/>
}