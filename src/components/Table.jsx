import Badges from "./Badges"
import { useState, useEffect } from "react"
import { renderClassNames, removePairs } from "../functions/utilities.mjs"
import { DateTime } from "luxon"
export default function Table(props) {
  //props.data ~ [{row1},{row2},{etc}]
  //each row ~ [{id:1, title:"The Red Room", etc},
  //each row ~ {id:1, title:"The Signalman", etc}]
  const data = props?.data ?? []
  const filterList = props?.filterList ?? []

  if (data.length === 0) { return <p>Nothing to see here...</p> }

  const renderCell = (key, row, i, j, fn) => {
    if (filterList.includes(key)) { return null }
    const Cell = (props) => {
      return <td key={row[key] + i + j}>{props.children}</td>
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
      const isHighlight = (array, row) => {
        if (!array || !row) { return false }
        return array.some(e => row[e[0]] === e[1])
      }
      const classNames = [
        `row ${oddOrEven(i)} `,
        isHighlight(props?.highlights, row) ? 'highlight' : "",
        row['Query After'] - row['Days Out'] < 0 && row['Responded'] === '-' ? "alert" : ""
      ]
      return <tr key={row.id} className={renderClassNames(classNames)}>{cells}</tr>
    })
  }
  const [sortBy, setSortBy] = useState({
    sortBy: null,
    isAscending: true
  })
  useEffect(() => {
    sort()
    //console.dir(sortBy)
  }, [sortBy])
  const sort = () => {
    const isDate = (str) =>{
        if(str && DateTime.fromFormat(str,'yyyy-MM-dd').isValid){
            return true
        }
        return false
    }
    if(props.setState){
      props.setState(prev => {
        const copy = [...data]
        const key = sortBy.sortBy
        return copy.sort((a, b) => {
          const valueA = typeof a[key] === 'number'?a[key]:isDate(a[key])?DateTime.fromFormat(a[key]??'9999-99-99','yyyy-MM-dd').valueOf():a[key]
          const valueB = typeof b[key] === 'number'?b[key]:isDate(b[key])?DateTime.fromFormat(b[key]??'9999-99-99','yyyy-MM-dd').valueOf():b[key]
          if (valueA < valueB) {
            return sortBy.isAscending ? -1 : 1
          }
          if (valueA > valueB) {
            return sortBy.isAscending ? 1 : -1
          }
          return 0
        })
      })
    }else{console.error("props.setState does not exist!")}
    
  }
  const renderHeaders = (data) => {
    const requestSort = (key) => {
      if (sortBy.sortBy === key) {
        setSortBy(prev => {
          return {
            ...prev,
            isAscending: !prev.isAscending
          }
        })
      } else {
        setSortBy(prev => {
          return {
            ...prev,
            sortBy: key
          }
        })
      }
    }
    return <tr className="rowHeader">
      {Object.keys(data[0]).map((heading, i) => {
        if (filterList.includes(heading)) { return }
        const isSortable = () => {
          if(data[0][heading]&&typeof data[0][heading] === 'object'){
            return false}
          return true
        }
        const renderArrows = (key) =>{
          if(sortBy.sortBy===key){
            return sortBy.isAscending?"\u2191":"\u2193"
          }
          return" "
        }
        return <th key={heading + i}><button onClick={isSortable()?() => { requestSort(heading) }:()=>{}}>{renderArrows(heading)+" "+heading+" "+renderArrows(heading)}</button></th>
      })}
    </tr>
  }
  return <table>
    <tbody>
      {renderHeaders(data, props.setState)}
      {renderRows(data)}
    </tbody>
  </table>






}

