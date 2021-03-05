import React from 'react'
import {GlobalCtx} from "../App"
import {Link} from "react-router-dom"

const Trucks = ({history}) => {
const {gState, setgState} = React.useContext(GlobalCtx)
const { url } = gState
const [trucks, setTrucks]= React.useState([])

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
<div className="table-responsive" >
        <table class="table table-hover table-dark">
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
        <tbody>
{trucks.map((truck, index)=> {
    return (<>
              <tr onClick={()=>{history.push('/adminnotes')}}>
            <th scope="row">{truck.truck_number}</th>
            <td>{truck.year}</td>
            <td>{truck.make}</td>
            <td>{truck.model}</td>
            <td>{truck.vin}</td>
            <td>{truck.ownership}</td>
            <td>{truck.status}</td>
          
          </tr>
          
          </>
)
})}
</tbody>
</table>
</div>
)


return (
  <div className="notes">
    <h1>Trucks</h1>
    <a href="/trucks/create"><button className="btn btn-primary">New Truck</button></a>
  {trucks.length > 0 ? loaded() : spinner()}
  </div>
);
}

export default Trucks