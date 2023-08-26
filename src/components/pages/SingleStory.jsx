import Page from "./Page"

export default (props) => {
    
    return <Page heading={props.data.Title}>
        {JSON.stringify(props.data)}
    </Page>
}