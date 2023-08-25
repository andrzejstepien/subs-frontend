import Dropdown from "../Dropdown"
export default () => {
    


    return <>
    <form>
    <label htmlFor="stories">Story:</label>
    <Dropdown name="stories" />
    <label htmlFor="publishers">Publisher:</label>
    <Dropdown name="publishers"/>
    
    </form>
    
    </>
}