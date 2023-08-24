import Checkboxes from "./Checkboxes" 
export default () => {


    return <>
    POOOOOP
    <form>
    <label htmlFor="title">Title</label>
    <input name="title" type="text"></input>
    <label htmlFor="wordcount">Wordcount</label>
    <input name="wordcount" type="number"></input>
    <Checkboxes name="genres"/>
    </form>
    
    </>
}