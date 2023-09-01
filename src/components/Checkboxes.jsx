import Checkbox from "./Checkbox"
export default (props) => {
    

    const optionsRendered = props.options.map((e,i)=>{
    console.log(props.values)
        return <Checkbox
                onChange={props.onChange} 
                label={e}
                key={e+i}
                value={props.values.includes(e)}
            />
    })

    return <fieldset>
        <legend>{props.legend}</legend>
        {optionsRendered}
    </fieldset>
}