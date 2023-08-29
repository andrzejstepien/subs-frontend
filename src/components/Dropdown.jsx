

export default (props) => {

    const optionsRendered = props.options.map((e,i)=>{
        return <option key={i} value={e}>{e}</option>
    })
    return <select name={props.name} defaultValue={props.default} value={props.value} onChange={props.handleChange}>
        {optionsRendered}
    </select>
}