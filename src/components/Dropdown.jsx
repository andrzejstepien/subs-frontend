import { useEffect, useState } from "react"
import { API } from "../API.mjs"

export default (props) => {
    const [options,setOptions] = useState([])
    useEffect(()=>{
        API.get(props.name).then(res=>{
            setOptions(res.data)
        })
    },[])

    const optionsRendered = options.map((e,i)=>{
        if(e===props.default){
            return <option key={i} value={e} selected>{e}</option>
        }
        return <option key={i} value={e}>{e}</option>
    })
    return <select name={props.name}>
        {optionsRendered}
    </select>
}