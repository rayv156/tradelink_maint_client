import React from 'react'
import { useLocation } from 'react-router-dom'


const RequestShow = () => {
    const location = useLocation()
    const { request } = location.state
    return (<>
        <h1>{request.date}</h1>
        <h1>{request.equipment}</h1>
        </>
    )
}

export default RequestShow
