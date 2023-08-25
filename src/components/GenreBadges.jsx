import { API } from "../API.mjs"
import { useEffect, useState } from "react"

export default (story) => {  
    const [genres,setGenres] = useState([])
    useEffect(()=>{
        API.get('stories-genres')
        .then(res=>{
            setGenres(res.data)
        })
    },[])
    
    const genresRendered = genres.map(genre=>{
        return <span className="genre">{genre}</span>
    })
    return <span>{genresRendered}</span>
}