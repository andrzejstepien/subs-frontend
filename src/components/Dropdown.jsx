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
        const value = Object.values(e)[0]
        return <option key={i} value={value}>{value}</option>
    })
    return <select name={props.name}>
        {optionsRendered}
    </select>
}