import {useRouteError} from "react-router-dom"

const Error404 = () => {
    const error = useRouteError();

    console.log(error);
    return (
        <div>
            <h3>Ops!</h3>
            <p>{error.data}</p>
        </div>
    )

}

export default Error404;