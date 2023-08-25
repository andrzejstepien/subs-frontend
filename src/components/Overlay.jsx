export default (props) => {
    
    return <span className="badge-container">{props.array.map((e,i)=>{
        return <span className="badge" key={i}>{e[0]}</span>
    })}</span>
}