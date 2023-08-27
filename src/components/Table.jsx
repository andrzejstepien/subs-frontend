import Badges from "./Badges"

export default function Table (props){
  //props.data ~ [{row1},{row2},{etc}]
  //each row ~ [{id:1, title:"The Red Room", etc},
  //each row ~ {id:1, title:"The Signalman", etc}]
  const data = props?.data??[]
  if(data.length===0){return <p>Nothing to see here...</p>}
  const oddOrEven = (n) => {
    return ["evenRow", "oddRow"][n % 2]
  }

const renderCellContents = (contents,key) => {
  if(Array.isArray(contents)){
    if(typeof contents[0] === 'object'){
      return <Table data={contents} setFocus={props.setFocus}/>
    }
    return <Badges data={contents} setFocus={props.setFocus}/>
  } 
  if(key==="Title" || key==="Story" || key==="Publication"){
    return <button onClick={()=>{props.setFocus(contents)}}>{contents}</button>
  }
  if(key==="Website"){
    return <a href={contents}>{contents}</a>
  }
  return <p>{contents}</p>
  
}

  const tableHeaders = <tr className="rowHeader">
    {Object.keys(data[0]).map((heading, i) => {
      return <th key={"" + heading + i}>{heading}</th>
    })}
  </tr>

  const tableRows = data.map((row, i) => {
    const cells = Object.keys(row).map((key, j) => {
      const cellValue = renderCellContents(row[key],key)

      return <td key={"" + i + j}> 
        {cellValue}
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

