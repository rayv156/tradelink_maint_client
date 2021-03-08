import React from 'react'
import {GlobalCtx} from "../App"
import "./Create.css";
import { Redirect } from 'react-router-dom'

const TrucksCreate = ({history, location}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const selectedTruck = location.selectedTruck
    console.log(selectedTruck)
    const {url} = gState
    // const blank = {
    //     truck_number: 0,
    //     year: 2020,
    //     make: "",
    //     model: "",
    //     vin: "",
    //     plates: "",
    //     inspection: "",
    //     insurance_exp: "",
    //     axles: 0,
    //     tires: "",
    //     ownership: "",
    //     status: ""

    // }
    const [formRequest, setFormRequest] = React.useState(selectedTruck)
    const [inputList, setInputList] = React.useState([{ repair_type: "", description: "", status: "", request_id: null}]);

    const handleChange = (event) => {
        setFormRequest({...formRequest, [event.target.name]: event.target.value})
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = await window.localStorage.getItem("token")
        await fetch(`${url}/trucks`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            },
            body: JSON.stringify(formRequest)
        })
        .then(response => response.json())
        history.push("/trucks")
        
    }


return (
<div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
        <h1>Create a Truck</h1>

        <div className="form-group form-inline">
        <label>Truck #: </label>
        <input
                id="truck_number"
                type="number"
                name='truck_number'
                className='form-control'
                
                value={formRequest.truck_number}
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
        <label>VIN: </label>
            <input id="vin"
                type="text"
                name='vin'
                className='form-control'
                placeholder="VIN"
                value={formRequest.vin}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Plates:</label>
            <input id="plates"
                type="text"
                name='plates'
                className='form-control'
                placeholder="Plates"
                value={formRequest.plates}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Inspection:</label>
            <input id="inspection"
                type="text"
                name='inspection'
                className='form-control'
                placeholder="Inspection"
                value={formRequest.inspection}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Insur Exp:</label>
            <input id="insurance_exp"
                type="text"
                name='insurance_exp'
                className='form-control'
                placeholder="Insurance Exp"
                value={formRequest.insurance_exp}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Axles:</label>
            <input id="axles"
                type="number"
                name='axles'
                className='form-control'
                placeholder="Axles"
                value={formRequest.axles}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Tires:</label>
            <input id="tires"
                type="text"
                name='tires'
                className='form-control'
                placeholder="Tires"
                value={formRequest.tires}
                onChange={handleChange} />
        </div>
        <div className="form-group form-inline">
        <label>Ownership:</label>
            <input id="ownership"
                type="text"
                name='ownership'
                className='form-control'
                placeholder="Ownership"
                value={formRequest.ownership}
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
        <br>


        </br>
        <button
            className="btn btn-primary btn-block"
            type="submit">Create Truck</button>
    </form>
</div>
    )
}

export default TrucksCreate