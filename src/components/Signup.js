import React from 'react'
import {GlobalCtx} from "../App"
import './Login.css'
import jwt_decode from "jwt-decode"


const Signup = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const {url} = gState
    const isPermitted = async () => {
        const token = await window.localStorage.getItem("token")
        if (token){
        const decoded_token = jwt_decode(token)
        return decoded_token.is_admin
        } else {
            return false
        }
    }
    console.log(isPermitted())
    const blank = {
        username: "",
        password: "",
        is_admin: false
    }
    const [form, setForm] = React.useState(blank)


    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, password, is_admin } = form;
        fetch(`${url}/users`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password, is_admin})
        })
        .then(response => response.json())
        .then(data => {
            setForm(blank)
            alert("Thanks for signing up! Login to get started.")
            history.push("/")
        })

    }
const checkAdmin = () => {
    return (<>
    <label>Admin Permissions?</label>
        <input
            name="is_admin"
            type="checkbox"
            checked={form.is_admin}
            onChange={() => setForm({...form, is_admin: !form.is_admin})} />
    </>
    )
}

    return (
        <div className="form-container">
    
    <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="form-group form-inline">
        <label><ion-icon name="person-outline"></ion-icon></label>
            <input
                id="username"
                type="text"
                name='username'
                className='form-control'
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange} />
            
        </div>

        <div className="form-group form-inline">
        <label><ion-icon name="lock-closed-outline"></ion-icon></label>
            <input id="password"
                type="password"
                name='password'
                className='form-control'
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        {gState.admin ? checkAdmin() : null}
        </div>
        <button
            className="btn btn-primary btn-block"
            type="submit" style={{backgroundColor: 'darkslategray'}}>Submit</button>
    </form>

</div>
    )

}

export default Signup