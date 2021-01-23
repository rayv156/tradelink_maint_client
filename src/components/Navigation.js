import React from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import {GlobalCtx} from "../App"
import "./Navigation.css"
import transportbrand from '../Transportationlogo.png'


const Navigation = ({history}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
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
  <Navbar.Brand href="/">Maintenance Log</Navbar.Brand>
      <Nav.Link href="/">Login</Nav.Link>
      <Nav.Link href="/signup">
        Signup
      </Nav.Link>
     
    </Nav>
  </Navbar.Collapse>
</Navbar>
  
</>

)

}

export default Navigation