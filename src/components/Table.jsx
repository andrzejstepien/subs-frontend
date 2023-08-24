

export default (props) => {
    const rowsData = props.data
    const keys = Object.keys(rowsData[0])
    const columnsData = {}
    for (const key of keys) {
        columnsData[key] = rowsData.map(row=>{
            return row[key]
        })
    }
    const oddOrEven = (n) =>{
        return ["evenRow","oddRow"][n%2]
    } 
    
    const renderedColumns = keys.map((key,i)=>{
        const cells = columnsData[key].map((cell,i)=>{
            return <div key={`${i}-${cell}`} className={`cell ${oddOrEven(i)}`}>{cell}</div>
        })
        return <span key={key+i} className="column">
            <h2>{key}</h2>
            {cells}
        </span>
    }) 
    console.dir(renderedColumns)


return <div className="table">{renderedColumns}</div>

 


   

}

