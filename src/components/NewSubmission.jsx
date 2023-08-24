import Dropdown from "./Dropdown"
export default () => {
    


    return <>
    <form>
    <label for="stories">Story:</label>
    <Dropdown name="stories" />
    <label for="publishers">Publisher:</label>
    <Dropdown name="publishers"/>
    
    </form>
    
    </>
}