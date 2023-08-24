import Checkbox from "./Checkbox"
export default (props) => {
    

    const optionsRendered = props.options.map((e,i)=>{
        return <Checkbox
                onChange={props.onChange} 
                label={e}
                key={e+i}
                value={props.data[e]}
            />
    })

    return <fieldset>
        <legend>{props.legend}</legend>
        {optionsRendered}
    </fieldset>
}