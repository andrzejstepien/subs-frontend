export default (props) => {
    const buttons = props.pageKeys.map(key=>{
        return <button onClick={()=>{props.changeFocus(key)}}>{key}</button>
    })
return <>
    <span className="sidebar">
    {buttons}
    </span>
    </>
}