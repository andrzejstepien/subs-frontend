export default (props) => {
    
    const badges = props.data.map((e,i)=>{
        return <span className="badge" key={i}>{e}</span>
    })
    return <span className="badge-container">{badges}</span>
}