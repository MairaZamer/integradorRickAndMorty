import error from '../images/error.jpg';

const Error = () => {
    return (
        <div>
            <h1>Error 404. Page not found</h1>
            <img style={{ objectFit: "cover" }} src={error} width={400} height={400} />
        </div>
    )
}


export default Error;