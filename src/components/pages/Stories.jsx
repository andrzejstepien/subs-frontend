import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
export default () => {
    const [data,setData] = useState([{}])
    const [stories,setStories] = useState([])
    const [storyGenres,setStoryGenres] = useState({
      "All Mouth":["horror"],
      "Is This a Scam?":["horror","sci-fi"],
      "Propping up the Bar":["horror","sci-fi","fantasy"]
    })

    useEffect(()=>{
        API.get("stories/full").then(res=>{setData(res.data)})
      },[])




    return <Table data={data} overlays={storyGenres}/>
}