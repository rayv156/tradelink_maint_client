import React from 'react'
import {GlobalCtx} from "../App"
import "./Requests.css";

const Requests = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
const { url } = gState
const boolArray = []
const [requests, setRequests]= React.useState([])
const [isExpanded, setisExpanded] = React.useState([])
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
    <div style={{margin: 'auto'}}>
    <div className="row justify-content-center" style={{margin: "auto"}} >
    <tr>
      <td colspan="5"> 
    <h3>Repairs</h3>
        <table className="table table-responsive table-dark">
    <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Repair Type</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>

          </tr>
        </thead>
        <tbody>
    
        {request.repairs.map((repair, index)=> {
          boolArray.push(false)
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
    </td>
    </tr>
    </div>
    </div>
    </>

    )
}


const loaded = () => (<>
<div className="card" style={{margin: "10px 10px 10px 10px", fontWeight: "bold", borderRadius: '15px'}}>
  <div className="row">
  <div className="col">#</div>
  <div className="col">Date</div>
  <div className="col">Unit Number</div>
  <div className="col">Equipment</div>
  <div className="col">Odometer</div>
  <div className="col">Repair Reqs</div>
  <div className="col">Status</div>
  <div className="col"></div>
  
  </div>

</div> 

  
{requests.map((request, index)=> {
    
    return (
    <div className="card request-card" style={{margin: "0px 10px 10px 10px", borderRadius: '15px', backgroundColor: 'rgb(249,249,250)', color: 'black'}} >
              <div className="row" >
            <div className="col">{request.id}</div>
            <div className="col">{request.date}</div>
            <div className="col">{request.unit_number}</div>
            <div className="col">{request.equipment}</div>
            <div className="col">{request.odometer}</div>
            <div className="col">{`(${request.repairs.length}) `}
            {request.repairs.map((repair, index) => {
                if (index + 1 < request.repairs.length){
                return `${repair.repair_type}, `
                } else {
                    return `${repair.repair_type}`
                }
            })}
            </div>
            <div className="col">{request.status}</div>
            <div className="col"><button className="btn btn-secondary" onClick={()=> {
                const test = [...isExpanded]
                test[index] = !test[index]
                setisExpanded(test)
                
                }}>+</button></div>
          </div>
          
            {isExpanded[index] ? showRepairs(request) : null}
          
          </div>
)
})}
</>

)




return (
  <div className="notes">
    <h1>Requests</h1>
    <a href="/requests/create"><button className="btn btn-primary">New Request</button></a>
  {requests.length > 0 ? loaded() : spinner()}
  </div>
);
}

export default Requests