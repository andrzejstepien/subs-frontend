export default ({array}) => {
    return array.map(e=>{
        return <span className="badge">{e}</span>
    })
}