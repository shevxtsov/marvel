import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const NotFound = () => {
    const divStyle = {
        textAlign: "center"
    }

    const linkStyle = {
        margin: "20px 0"
    }

    return (
        <div style={divStyle}>
            <h1>404</h1>
            <p>Not found</p>
            <Link
                to="/"
                className="button button__main"
                style={linkStyle}
            >
                <div className="inner">Back to homepage</div>
            </Link>
            <ErrorMessage />
        </div>
    )
}

export default NotFound