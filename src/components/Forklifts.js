import React from 'react'
import {GlobalCtx} from "../App"

const Forklifts = ({history}) => {
const {gState, setgState} = React.useContext(GlobalCtx)
const { url } = gState
const [forklifts, setForklifts]= React.useState([])

const getForklifts = async () => {
const token = await window.localStorage.getItem("token")
  const response = await fetch(`${url}/forklifts`,  {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
    }
})
  const data = await response.json()
  setForklifts(data)
}

React.useEffect(() => {
  getForklifts()
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
{forklifts.map((forklift, index)=> {
    return (<>
              <tr onClick={()=>{history.push('/adminnotes')}}>
            <th scope="row">{forklift.forklift_number}</th>
            <td>{forklift.year}</td>
            <td>{forklift.make}</td>
            <td>{forklift.model}</td>
            <td>{forklift.fork_length}</td>
            <td>{forklift.fork_type}</td>
            <td>{forklift.weight_capacity}</td>
          
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
    <h1>Forklifts</h1>
  {forklifts.length > 0 ? loaded() : spinner()}
  </div>
);
}

export default Forklifts