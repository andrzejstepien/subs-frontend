import { useEffect, useState } from "react"
import { API } from "../API.mjs"
export default () => {
    const [stories,setStories] = useState([])
    useEffect(()=>{
        API.get("stories").then(res=>{
            console.log(res.data)
            setStories(res.data)
        })
    },[])
   

    return <>
    <form>


    </form>
    
    </>
}