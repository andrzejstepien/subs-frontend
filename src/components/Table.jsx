import Badges from "./Badges"
import { useState, useEffect } from "react"
import { renderClassNames, removePairs } from "../functions/utilities.mjs"
import { DateTime } from "luxon"
export default function Table(props) {
  //props.data ~ [{row1},{row2},{etc}]
  //each row ~ [{id:1, title:"The Red Room", etc},
  //each row ~ {id:1, title:"The Signalman", etc}]
  const [sortBy, setSortBy] = useState({
    sortBy: props.sortByDefault??Object.keys(data[0])[0],
    isAscending: false
  })
  useEffect(() => {
    console.dir(sortBy)
    //sort(props.setState,data,sortBy)
  }, [sortBy])
  useEffect(()=>{
    //console.dir(sortBy)
    //sort(props.setState,data,sortBy) 
    console.log("data is ready!")
  },[props?.data])

  const filterList = props?.filterList ?? []
  const sort = (data,sortBy) => {
    const isDate = (str) =>{
        if(str && DateTime.fromFormat(str,'yyyy-MM-dd').isValid){
            return true
        }
        return false
    }
        const key = sortBy.sortBy
        return data.sort((a, b) => {
          const determineSortValue = (val) => {
            if(val===null){return 253370761200000}
            if(typeof val === 'number'){return val}
            if(isDate(val)){return DateTime.fromFormat(val,'yyyy-MM-dd').valueOf()}
            return val
          }
          const valueA = determineSortValue(a[key])
          const valueB = determineSortValue(b[key])
          if (valueA < valueB) {
            return sortBy.isAscending ? -1 : 1
          }
          if (valueA > valueB) {
            return sortBy.isAscending ? 1 : -1
          }
          return 0
        })
      
 
    
  }
  const data = [...props?.data]
  .map(e=>{
    for (const filter of filterList) {
      delete e[filter]
    }
    return e
  }) ?? []
  if (data.length === 0) { return <p>Nothing to see here...</p> }
  sort(data,sortBy)

  const renderHeaders = (data) => {
    const changeSortBy = (key) => {
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
            isAscending:false,
            sortBy: key
          }
        })
      }
    }
    return <tr className="rowHeader">
      {Object.keys(data[0]).map((heading, i) => {
        const isSortable = () => {
          if(data[0][heading]&&typeof data[0][heading] === 'object'){
            return false}
          return true
        }
        const renderArrows = (key) =>{
          if(sortBy.sortBy===key){
            return sortBy.isAscending?"\u2191":"\u2193"
          }
          return"\u2002"
        }
        return <th key={heading + i}><button onClick={isSortable()?() => { changeSortBy(heading) }:()=>{}}>{renderArrows(heading)+" "+heading+" "+renderArrows(heading)}</button></th>
      })}
    </tr>
  }

  const renderCell = (key, row, i, j, fn) => {
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
  
  return <table>
    <tbody>
      {renderHeaders(data, props.setState)}
      {renderRows(data)}
    </tbody>
  </table>






}

