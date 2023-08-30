import Badges from "./Badges"
import { renderClassNames, removePairs } from "../functions/utilities.mjs"
export default function Table(props) {
  //props.data ~ [{row1},{row2},{etc}]
  //each row ~ [{id:1, title:"The Red Room", etc},
  //each row ~ {id:1, title:"The Signalman", etc}]
  const data = props?.data ?? []
  const filterList = props?.filterList ?? []
  if (data.length === 0) { return <p>Nothing to see here...</p> }
  
  const renderCell = (key, row, i, j) => {
    if (filterList.includes(key)) { return null }
    const Cell = (props) => {
      return <td key={row[key]+i+j}>{props.children}</td>
    }
    const contents = row[key]
    if (Array.isArray(contents)) {
      if (typeof contents[0] === 'object') {
        return <Cell><Table data={contents} setFocus={props.setFocus} /></Cell>
      }
      return <Cell><Badges data={contents} setFocus={props.setFocus} /></Cell>
    }
    if (key === "Title" || key === "Story" || key === "Publication") {
      return <Cell><button onClick={() => { props.setFocus(contents) }}>{contents}</button></Cell>
    }
    if (key === "Website") {
      return <Cell><a href={contents}>{contents}</a></Cell>
    }
    if (key === "Days Out") {
      return <Cell>{row['Days Out']} </Cell>
    }
    return <Cell>{contents}</Cell>
  }
  const oddOrEven = (n) => {
    return ["evenRow", "oddRow"][n % 2]
  }
  const renderRows = (data) => {
    return data.map((row, i) => {
      const cells = Object.keys(row).map((key, j) => {
        return <>{renderCell(key, row, i, j)}</>    
      })
      const isHighlight = (array,row) =>{
        return array.some(e=>row[e[0]]===e[1])
      }
      const classNames = [
        `row ${oddOrEven(i)} `,
        isHighlight(props.highlights,row)?'highlight':"no-highlight",
        row['Query After'] - row['Days Out'] < 0 && row['Responded'] === '-' ? "alert" : ""
      ]
      return <tr key={""+row.id+i} className={renderClassNames(classNames)}>{cells}</tr>
    })
  }
  const renderHeaders = (data) => {
    return <tr className="rowHeader">
      {Object.keys(data[0]).map((heading, i) => {
        if (filterList.includes(heading)) { return }
        return <th key={heading+i}>{heading}</th>
      })}
    </tr>
  }


  return <table>
    <tbody>
      {renderHeaders(data)}
      {renderRows(data)}
    </tbody>
  </table>






}

