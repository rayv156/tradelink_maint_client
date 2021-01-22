import React from 'react'
import {GlobalCtx} from "../App"

const Trailers = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
const { url } = gState
const [trailers, setTrailers]= React.useState([])

const getTrailers = async () => {
const token = await window.localStorage.getItem("token")
  const response = await fetch(`${url}/trailers`,  {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
    }
})
  const data = await response.json()
  setTrailers(data)
}

React.useEffect(() => {
  getTrailers()
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
{trailers.map((trailer, index)=> {
    return (<>
              <tr onClick={()=>{history.push('/adminnotes')}}>
            <th scope="row">{trailer.trailer_number}</th>
            <td>{trailer.year}</td>
            <td>{trailer.make}</td>
            <td>{trailer.model}</td>
            <td>{trailer.vin}</td>
            <td>{trailer.ownership}</td>
            <td>{trailer.status}</td>
          
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
    <h1>Trailers</h1>
  {trailers.length > 0 ? loaded() : spinner()}
  </div>
);
}

export default Trailers