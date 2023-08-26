export default (props) => {
    return <div className='page'>
        <header><h1>{props.heading}</h1></header>
    {props.children}
    </div>
}