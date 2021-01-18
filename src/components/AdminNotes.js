import React from 'react'
import {GlobalCtx} from "../App"
import { Link } from 'react-router-dom'




const AdminNotes = () => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { url } = gState
    const [notes, setNotes]= React.useState([])
  
    const getNotes = async () => {
    const token = await window.localStorage.getItem("token")
      const response = await fetch(`${url}/notes`,  {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${token}`
        }
    })
      const data = await response.json()
      setNotes(data)
    }
  
    React.useEffect(() => {
      getNotes()
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
    <div className="workout-container" >
    {notes.map((note, index)=> {
        return (
            <div className="card" style={{width: 350, margin: 10, justifyContent: 'space-between', fontFamily: 'Permanent Marker, cursive', boxShadow: '5px 5px 20px gray'}}>
            <h2 className="card-header">Note #{index+1}</h2>
            <p>{note.message}</p>
      
      </div>
    )
    })}
    </div>
    )
  
  
    return (
      <div className="notes">
        <h1>Admin Notes</h1>
      {notes.length > 0 ? loaded() : spinner()}
      </div>
    );
}

export default AdminNotes