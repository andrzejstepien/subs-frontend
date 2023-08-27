import { useState, useEffect } from "react"
import Table from "../Table"
import {API} from '../../API.mjs'
import Page from "./Page"
export default (props) => {
    

      const filterList = [
        'Submissions']
      

      const removePairs = (array,keys) => {
        return array.map(e=>{
          for (const key of keys) {
            delete e[key]
          }
          return e
        })
      }
      console.dir(props.data)

    return  <Page heading="Stories">
              <Table data={props.data} setFocus={props.setFocus}/>
            </Page>
    
   
}