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

export const GlobalCtx = React.createContext(null)


function App({history}) {
  const [gState, setgState] = React.useState({
    url: "http://localhost:3000", 
    token: false, 
    user: null, 
    admin: null, 
    error: null
  })
  
  React.useEffect(()=>{
    const token = window.localStorage.getItem("token")
    const admin = JSON.parse(window.localStorage.getItem("admin"))
    const user = JSON.parse(window.localStorage.getItem("user"))
   //console.log(user)
   if (token){
     setgState({...gState, token: true, user: user, admin: admin})
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
        
      </Switch>
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
