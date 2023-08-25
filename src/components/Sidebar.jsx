export default (props) => {
    const buttons = props.pageKeys.map((key,i)=>{
        return <button key={i} onClick={()=>{props.setFocus(key)}}>{key}</button>
    })
return <>
    <span className="sidebar">
    <div className="cpanel">
    {buttons}
    </div>
    </span>
    </>
}