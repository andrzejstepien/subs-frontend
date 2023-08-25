export default (props) => {
    //props.data ~ [{row1},{row2},{etc}]
    //each row ~ {id:1, title:"Robin Hood", etc}

    const oddOrEven = (n) =>{
        return ["evenRow","oddRow"][n%2]
    } 

  const tableHeaders = <tr className="rowHeader">
  {Object.keys(props.data[0]).map((heading,i)=>{
    return <th key={""+heading+i}>{heading}</th>
  })}
  </tr>

  const tableRows = props.data.map((row,i)=>{
    let currentRow = null
    const cells = Object.keys(row).map((key,j)=>{
        return <td key={""+i+j}>
            {row[key]}
            </td>
    })
    return <tr key={i} 
    className={`row ${oddOrEven(i)}`}>{cells}</tr>
  })

return <table>
    <tbody>
{tableHeaders}
{tableRows}
</tbody>
</table>

 


   

}

