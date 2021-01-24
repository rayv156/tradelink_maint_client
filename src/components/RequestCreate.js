import React from 'react'
import {GlobalCtx} from "../App"
import "./Create.css";
import { Redirect } from 'react-router-dom'

const RequestCreate = () => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const {url} = gState
    const blank = {
        date: Date(),
        equipment: "",
        odometer: 0,
        status: ""
    }
    const [formRequest, setFormRequest] = React.useState(blank)
    const [inputList, setInputList] = React.useState([{ repair_type: "", description: "", status: "", request_id: gState.request_id }]);

    const handleChange = (event) => {
        setFormRequest({...formRequest, [event.target.name]: event.target.value})
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };

      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
     
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, { repair_type: "", description: "", status: "", request_id: gState.request_id }]);
      };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = await window.localStorage.getItem("token")
        await fetch(`${url}/requests`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            },
            body: JSON.stringify(formRequest)
        })
        .then(response => response.json())
        .then((data) => {
            setgState({...gState, request_id: data.id})
        })
        await fetch(`${url}/repairs`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            },
            body: JSON.stringify(inputList)
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

        <div className="App">
      
      {inputList.map((x, i) => {
        return (<>
          <div className="form-group form-inline">
              <label>Repair Type:</label>
            <input
              className="form-control"
              name="repair_type"
              placeholder="Repair Type"
              value={x.repair_type}
              onChange={e => handleInputChange(e, i)}
            />
            </div>
            <div className="form-group form-inline">
            <label>Description</label>
            <input
              className="form-control"
              name="description"
              placeholder="Description"
              value={x.description}
              onChange={e => handleInputChange(e, i)}
            />
            </div>
            <div className="form-group form-inline">
            <label>Status</label>
            <input
              className="form-control"
              name="status"
              placeholder="Status"
              value={x.status}
              onChange={e => handleInputChange(e, i)}
            />
            </div>
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="btn btn-danger"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button className="btn btn-success" onClick={handleAddClick}>Add</button>}
            </div>
          </>
        );
      })}
    </div>
        
        <p style={{color: 'red'}}>{gState.error}</p>
        <br>


        </br>
        <button
            className="btn btn-primary btn-block"
            type="submit">Submit Request</button>
    </form>
</div>
    )
}

export default RequestCreate