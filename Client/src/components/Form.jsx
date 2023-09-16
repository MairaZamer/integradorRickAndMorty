import { useState } from "react"
import validation from "./validation"


const Form = ({ login }) => {
    const [errors, setErrors] = useState({})
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })

        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }

    return (
        <div className="mainWrapper">
            <h1 className="mainTitle">Rick And Morty</h1>
            <form className="wrapperLogin" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={userData.email} onChange={handleChange} />
                    {errors.email && <span className="errors">{errors.email}</span>}
                </div>

                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                    {errors.password && <span className="errors">{errors.password}</span>}
                </div>
                <button className="btn">Submit</button>
            </form>
        </div>
    )
}

export default Form