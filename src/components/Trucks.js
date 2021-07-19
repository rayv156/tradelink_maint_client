import React from 'react'
import {GlobalCtx} from "../App"
import {Link} from "react-router-dom"

const Trucks = ({history}) => {
const {gState, setgState} = React.useContext(GlobalCtx)
const { url } = gState
const [trucks, setTrucks]= React.useState([])
const blank = {
  truck_number: 0,
  year: 2020,
  make: "",
  model: "",
  vin: "",
  plates: "",
  inspection: "",
  insurance_exp: "",
  axles: 0,
  tires: "",
  ownership: "",
  status: ""

}
const getTrucks = async () => {
const token = await window.localStorage.getItem("token")
  const response = await fetch(`${url}/trucks`,  {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
    }
})
  const data = await response.json()
  setTrucks(data)
}

React.useEffect(() => {
  getTrucks()
}, [])

const spinner = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <div className="spinner-grow spinner-grow-sm" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow spinner-grow-md" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow spinner-grow-lg" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div>
  )
}

const loaded = () => (
<div id="row-container">
        {/* <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Year</th>
            <th scope="col">Make</th>
            <th scope="col">Model</th>
            <th scope="col">Vin</th>
            <th scope="col">Ownership</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody> */}
        <ul className="list-group">
        <li className="list-group-item" >
              <div className="row">
              <div className="col">#</div>
            <div className="col">Year</div>
            <div className="col">Make</div>
            <div className="col">Model</div>
            <div className="col">Vin</div>
            <div className="col">Ownership</div>
            <div className="col">Status</div>
            </div>
              </li>
{trucks.map((truck, index)=> {
    return (<>
    <Link to={{pathname: "/trucks/create", selectedTruck: truck }} style={{textDecoration: 'none'}}>
            <li className="list-group-item" >
              <div className="row">
              <div className="col">{truck.truck_number}</div>
            <div className="col">{truck.year}</div>
            <div className="col">{truck.make}</div>
            <div className="col">{truck.model}</div>
            <div className="col">{truck.vin}</div>
            <div className="col">{truck.ownership}</div>
            <div className="col">{truck.status}</div>
            </div>
              </li>
          
        
          </Link>
          
          </>
)
})}
</ul>
{/* </tbody> */}
{/* </table> */}
</div>
)


return (
  <div className="notes">
    <h1>Trucks</h1>
    <Link to={{pathname: "/trucks/create", selectedTruck: blank }}><button className="btn btn-primary">New Truck</button></Link>
  {trucks.length > 0 ? loaded() : spinner()}
  </div>
);
}

export default Trucks