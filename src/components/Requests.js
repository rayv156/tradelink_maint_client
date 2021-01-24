import React from 'react'
import {GlobalCtx} from "../App"

const Requests = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
const { url } = gState
const [requests, setRequests]= React.useState([])

const getRequests = async () => {
const token = await window.localStorage.getItem("token")
  const response = await fetch(`${url}/requests`,  {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
    }
})
  const data = await response.json()
  setRequests(data)
}

React.useEffect(() => {
  getRequests()
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
            <th scope="col">Date</th>
            <th scope="col">Equipment</th>
            <th scope="col">Odometer</th>
            <th scope="col">Repair Reqs</th>
            <th scope="col">Status</th>

          </tr>
        </thead>
        <tbody>
{requests.map((request, index)=> {
    return (<>
              <tr onClick={()=>{history.push('/adminnotes')}}>
            <th scope="row">{request.id}</th>
            <td>{request.date}</td>
            <td>{request.equipment}</td>
            <td>{request.odometer}</td>
            <td>{`(${request.repairs.length}) `}
            {request.repairs.map((repair, index) => {
                if (index + 1 < request.repairs.length){
                return `${repair.repair_type}, `
                } else {
                    return `${repair.repair_type}`
                }
            })}
            </td>
            <td>{request.status}</td>
            <td><button>+</button></td>
          
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
    <h1>Requests</h1>
  {requests.length > 0 ? loaded() : spinner()}
  </div>
);
}

export default Requests