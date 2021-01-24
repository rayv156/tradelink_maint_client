import React from 'react'
import {GlobalCtx} from "../App"

const Requests = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
const { url } = gState
const boolArray = []
const [requests, setRequests]= React.useState([])
const [isExpanded, setisExpanded] = React.useState(boolArray)
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
  setisExpanded(boolArray)
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

const showRepairs = (request) => {
    
    return (<>
    <div className="table-responsive" style={{margin: "auto"}} >
        <table className="table table-hover table-light">
    <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Repair Type</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>

          </tr>
        </thead>
        <tbody>
    
        {request.repairs.map((repair, index)=> {
            return (<>
            <tr>
            <th scope="row">{repair.id}</th>
            <td>{repair.repair_type}</td>
            <td >{repair.description}</td>
            <td >{repair.status}</td>
            </tr>
            </>
            )
        })
    }
    </tbody>
    </table>
    </div>
    </>

    )
}


const loaded = () => (
<div className="table-responsive" >
        <table className="table table-hover table-dark">
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
    boolArray.push(false)
    return (<>
              <tr >
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
            <td><button onClick={()=> {
                boolArray[index] = !boolArray[index]
                getRequests()
                }}>+</button></td>
          </tr>
          {console.log(isExpanded[index])}
            {isExpanded[index] ? showRepairs(request) : null}
          
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
    <a href="/requests/create"><button >New Request</button></a>
  {requests.length > 0 ? loaded() : spinner()}
  </div>
);
}

export default Requests