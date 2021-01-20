import React from 'react'
import {GlobalCtx} from "../App"
import { Link } from 'react-router-dom'




const NotAuthorized = () => {
  
    return (
      <div className="notes">
        <h1>Not Authorized</h1>
      <p>You do not have permission to view this page.</p>
      </div>
    );
}

export default NotAuthorized