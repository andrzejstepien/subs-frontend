

export default (props) => {
    console.log('options')
    console.dir(props.options)
    const optionsRendered = props.options?.map((e,i)=>{
        return <option key={i} value={e}>{e}</option>
    })
    return <select name={props.name} value={props.value} onChange={props.handleChange}>
        {optionsRendered}
    </select>
}