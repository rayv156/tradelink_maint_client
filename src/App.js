import React from 'react'
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Notes from './components/Notes'
import NotAuthorized from './components/NotAuthorized'
import AdminNotes from './components/AdminNotes'
import Navigation from './components/Navigation'
import NavSignedIn from './components/NavSignedIn'
import Trucks from './components/Trucks'
import Trailers from './components/Trailers'
import Forklifts from './components/Forklifts'
import Requests from './components/Requests'
import RequestCreate from './components/RequestCreate'
import jwt_decode from "jwt-decode"

export const GlobalCtx = React.createContext(null)


function App({history}) {
  const [gState, setgState] = React.useState({
    url: "http://localhost:3000", 
    token: false, 
    user: null, 
    admin: null, 
    error: null,
    user_id: null
  })
  
  React.useEffect(()=>{
    const token = window.localStorage.getItem("token")
    const user = JSON.parse(window.localStorage.getItem("user"))
    //console.log(user)
    if (token){
     const decoded_admin = jwt_decode(token)
     setgState({...gState, token: true, user: user, admin: decoded_admin.is_admin, user_id: decoded_admin.user_id})
   } else {
     setgState({...gState, token: false, user: null, admin: null})
   }
  }, [])
  
  const checkLogin = () => {
    if (gState.token){
      return <NavSignedIn/>
    } else {
      return <Navigation/>
    }
  }
  

  return (
    <GlobalCtx.Provider value={{ gState, setgState }}>
    <div className="App">
      {checkLogin()}
      <Switch>
        <Route exact path="/">
          {gState.admin && gState.token ? <Redirect to="/adminnotes"/> : gState.token && !gState.admin ? <Redirect to="/notes"/> : <Login/>}
          </Route>
        <Route path="/notes" exact component={Notes} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/adminnotes" exact component={gState.admin ? AdminNotes : NotAuthorized} />
        <Route path="/trucks" exact component={gState.admin ? Trucks : NotAuthorized} />
        <Route path="/trailers" exact component={gState.admin ? Trailers : NotAuthorized} />
        <Route path="/forklifts" exact component={gState.admin ? Forklifts : NotAuthorized} />
        <Route path="/requests" exact component={gState.admin ? Requests : NotAuthorized} />
        <Route path="/requests/create" exact component={gState.admin ? RequestCreate : NotAuthorized} />
        
      </Switch>
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
