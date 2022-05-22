import { Link } from "react-router-dom"

export default function Breadcrumb(props){
    return (
        <header className="app--header">
            <strong>{props.link? <Link to={props.link}>&lt;&lt; {props.text}</Link> : props.text}</strong>
            </header>
    )
}