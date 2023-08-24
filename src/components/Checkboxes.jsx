import { useState, useEffect } from "react"
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
        return <div>
            <input type="checkbox" key={value+i} name={value}/>
            <label htmlFor={value}>{value}</label>
        </div>
    })

    return <fieldset>
        <legend>Genre:</legend>
        {optionsRendered}
    </fieldset>
}