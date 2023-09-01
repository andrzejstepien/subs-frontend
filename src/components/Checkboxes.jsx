import Checkbox from "./Checkbox"
export default (props) => {
    
    console.dir(props.options)
    const optionsRendered = props.options.map((e,i)=>{
    console.log(props.values)
        return <Checkbox
                onChange={props.onChange} 
                label={e}
                key={e+i}
                value={props?.values[e]}
            />
    })

    return <fieldset>
        <legend>{props.legend}</legend>
        {optionsRendered}
    </fieldset>
}