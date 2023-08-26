import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
export default () => {
    const [data,setData] = useState([{}])
    const [storyGenres,setStoryGenres] = useState({})
    
    useEffect(()=>{
      API.get("stories-genres").then(res=>{setStoryGenres(res.data)})  
      API.get("stories/full").then(res=>{setData(res.data)})
      },[])
    useEffect(()=>{
      console.dir(storyGenres)
    },[storyGenres])




    return <Table data={data} overlays={storyGenres}/>
}