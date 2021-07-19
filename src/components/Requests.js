import React from 'react';
import { GlobalCtx } from "../App";
import { Link } from 'react-router-dom'
import "./Requests.css";

const Requests = ({ history }) => {
  const { gState } = React.useContext(GlobalCtx)
  const { url } = gState
  const boolArray = []
  const [requests, setRequests] = React.useState([])
  const [isExpanded, setisExpanded] = React.useState([])
  const getRequests = async () => {
    const token = await window.localStorage.getItem("token")
    const response = await fetch(`${url}/requests`, {
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      <div className="row">
        
                
                  {request.repairs.map((repair, index) => {
                    boolArray.push(false)
                    return (<>
                 <div className="col-sm-3">   
         <div className="card text-black bg-secondary mb-3" >
           <img className="card-img-top" src="https://dss.fosterwebmarketing.com/upload/dhclaw.com/39504259%20totaled%20car.jpg" alt="Card image cap" />
           <div className="card-body">
                  <ul className="list-group-flush" style={{padding: 0}}>
                        <li className="list-group-item">Repair #: {repair.id}</li>
                        <li className="list-group-item">Repair Type: {repair.repair_type}</li>
                        <li className="list-group-item">Description: {repair.description}</li>
                        <li className="list-group-item">Status: {repair.status}</li>
                      
                </ul>
                </div>
               
          </div>
          </div>  
                    </>
                    )
                  })
                }
       
      </div>
    </>

    )
  }


  const loaded = () => (
   <div id="row-container" >
        
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
            <div className="col">#</div>
            <div className="col">Date</div>
            <div className="col">Equipment</div>
            <div className="col">Odometer</div>
            <div className="col">Repair Reqs</div>
            <div className="col">Status</div>
            <div className="col"></div>
            <div className="col"></div>
            </div>
            </li>


    {requests.map((request, index) => {
      
      return (<>
      <li className="list-group-item">
        <div className="row">
      <div className="col">{request.id}</div>
      <div className="col">{request.date}</div>
      <div className="col">{request.equipment}</div>
      <div className="col">{request.odometer}</div>
      <div className="col">{`(${request.repairs.length}) `}
              {request.repairs.map((repair, index) => {
                if (index + 1 < request.repairs.length) {
                  return `${repair.repair_type}, `
                } else {
                  return `${repair.repair_type}`
                }
              })}
            </div>
            <div className="col">{request.status}</div>
            <div className="col"><Link to={{pathname: `/requests/${request.id}`, state: {request: request}}} request={request}>Edit
            </Link></div>
            <div className="col"><button className="btn btn-secondary" style={{width: '40px', margin: -20, marginLeft: -80}} onClick={() => {
              const test = [...isExpanded]
              test[index] = !test[index]
              setisExpanded(test)
              
            }}>{isExpanded[index] ? "-" : "+"}</button></div>
          
          </div>
          </li>
          {isExpanded[index] ? showRepairs(request) : null}
        </>
      )
    })}
    </ul>
  
  </div>

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