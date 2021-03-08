import React from 'react'
import {GlobalCtx} from "../App"
import "./Create.css";
import { Redirect } from 'react-router-dom'

const ForkliftsCreate = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const {url} = gState
    const blank = {
        forklift_number: 0,
        year: 2020,
        make: "",
        model: "",
        fork_length: "",
        fork_type: "",
        weight_capacity: ""

    }
    const [formRequest, setFormRequest] = React.useState(blank)
    const [inputList, setInputList] = React.useState([{ repair_type: "", description: "", status: "", request_id: null}]);

    const handleChange = (event) => {
        setFormRequest({...formRequest, [event.target.name]: event.target.value})
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = await window.localStorage.getItem("token")
        await fetch(`${url}/forklifts`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            },
            body: JSON.stringify(formRequest)
        })
        .then(response => response.json())
        history.push("/forklifts")
        
    }


return (
<div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
        <h1>Create a Forklift</h1>

        <div className="form-group form-inline">
        <label>Forklift #: </label>
        <input
                id="forklift_number"
                type="number"
                name='forklift_number'
                className='form-control'
                
                value={formRequest.forklift_number}
                onChange={handleChange} />
            
        </div>
        <div className="form-group form-inline">
        <label>Year:</label>
            <input id="year"
                type="number"
                name='year'
                className='form-control'
                placeholder="Year"
                value={formRequest.year}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Make: </label>
            <input id="make"
                type="text"
                name='make'
                className='form-control'
                placeholder="Make"
                value={formRequest.make}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Model: </label>
            <input id="model"
                type="text"
                name='model'
                className='form-control'
                placeholder="Model"
                value={formRequest.model}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Fork Length: </label>
            <input id="fork_length"
                type="text"
                name='fork_length'
                className='form-control'
                placeholder="Fork Length"
                value={formRequest.fork_length}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Fork Type:</label>
            <input id="fork_type"
                type="text"
                name='fork_type'
                className='form-control'
                placeholder="Fork Type"
                value={formRequest.fork_type}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Weight Capacty:</label>
            <input id="weight_capacity"
                type="text"
                name='weight_capacity'
                className='form-control'
                placeholder="Weight Cpcty"
                value={formRequest.weight_capacity}
                onChange={handleChange} />
        </div>
        
       
        
        <p style={{color: 'red'}}>{gState.error}</p>
        <br>


        </br>
        <button
            className="btn btn-primary btn-block"
            type="submit">Create Truck</button>
    </form>
</div>
    )
}

export default ForkliftsCreate