import React from 'react'
import {GlobalCtx} from "../App"
import "./Create.css";
import { Redirect } from 'react-router-dom'

const RequestCreate = () => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const {url} = gState
    const blank = {
        date: "",
        equipment: "",
        odometer: 0,
        status: 0,
        user_id: gState.user_id
    }
    const [formRequest, setFormRequest] = React.useState(blank)

    const handleChange = (event) => {
        setFormRequest({...formRequest, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`${url}/requests`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formRequest)
        })
        .then(response => response.json())
        .then(<Redirect to="/requests"/>)
    }


return (
<div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
        <h1>Create a Request</h1>
        <div className="form-group form-inline">
        <label>Date: </label>
        <input
                id="date"
                type="date"
                name='date'
                className='form-control'
                placeholder={Date()}
                value={formRequest.date}
                onChange={handleChange} />
            
        </div>

        <div className="form-group form-inline">
        <label>Equipment: </label>
            <input id="equipment"
                type="text"
                name='equipment'
                className='form-control'
                placeholder="Equipment Type"
                value={formRequest.equipment}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Odometer:</label>
            <input id="odometer"
                type="number"
                name='odometer'
                className='form-control'
                placeholder="Equipment Type"
                value={formRequest.odometer}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Status:</label>
            <input id="status"
                type="text"
                name='status'
                className='form-control'
                placeholder="Status"
                value={formRequest.status}
                onChange={handleChange} />
        </div>
        
        
        <p style={{color: 'red'}}>{gState.error}</p>
        <button
            className="btn btn-primary btn-block"
            type="submit">Submit</button>
    </form>
</div>
    )
}

export default RequestCreate