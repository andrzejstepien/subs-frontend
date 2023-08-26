import Page from "./Page"
import { useEffect, useState } from "react"
import {API} from '../../API.mjs'
export default (props) => {
    const [data,setData] = useState({})
    useEffect(()=>{
        API.get('page/single-story',{params:{title:props.title}}).then((res)=>{
            setData(res.data)
        })
    },[])
    return <Page heading={props.title}>
        {JSON.stringify(data)}
    </Page>
}