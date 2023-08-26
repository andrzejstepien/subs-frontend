import Overlay from "./Overlay"

export default (props) => {
  //props.data ~ [{row1},{row2},{etc}]
  //each row ~ [{id:1, title:"The Red Room", etc},
  //each row ~ {id:1, title:"The Signalman", etc}]

  const oddOrEven = (n) => {
    return ["evenRow", "oddRow"][n % 2]
  }



  const tableHeaders = <tr className="rowHeader">
    {Object.keys(props.data[0]).map((heading, i) => {
      return <th key={"" + heading + i}>{heading}</th>
    })}
  </tr>

  const tableRows = props.data.map((row, i) => {
    const cells = Object.keys(row).map((key, j) => {
      const cellValue = row[key]
      const overlaysValue = props.overlays ? props?.overlays[cellValue]:false
      return <td key={"" + i + j}>
        {overlaysValue &&<Overlay array={overlaysValue}/>} 
        
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

