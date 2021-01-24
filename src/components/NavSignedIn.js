import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {GlobalCtx} from "../App"
import "./Navigation.css"
import transportbrand from '../Transportationlogo.png'

const NavSignedIn = ({history}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const dropDown = () => {
    return (
    <NavDropdown title="Vehicles" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/trucks">Trucks</NavDropdown.Item>
        <NavDropdown.Item href="/trailers">Trailers</NavDropdown.Item>
        <NavDropdown.Item href="/forklifts">Forklifts</NavDropdown.Item>
      </NavDropdown>
    )
  }
    return (
<>
<Navbar collapseOnSelect expand="lg" variant="light" bg="light">
  <Navbar.Brand href="/">
      <img style={{width: "200px", paddingRight: 20}} src={transportbrand} /></Navbar.Brand>
      
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav>
    <Navbar.Brand>Maintenance Log</Navbar.Brand>
    </Nav>
    {/* <Nav>
      <Navbar.Text>Signed in as: {gState.user} </Navbar.Text>

    </Nav> */}
    <Nav>
      {gState.admin ? <Nav.Link href="/adminnotes">Notes</Nav.Link> : <Nav.Link href="/notes">Notes</Nav.Link>}
      {gState.admin ? <Nav.Link href="/requests">Requests</Nav.Link> : null}
      {gState.admin ? dropDown() : null}

      <Nav.Link href="/" onClick={() => {
          window.localStorage.removeItem("token")
          window.localStorage.removeItem("user")
          setgState({...gState, token: false, user: null})
          alert("You have successfully logged out")
        }}>Logout</Nav.Link>

    </Nav>
  </Navbar.Collapse>
</Navbar>
  
</>

)

}

export default NavSignedIn