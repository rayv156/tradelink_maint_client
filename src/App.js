import React from 'react'
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Notes from './components/Notes'
import AdminNotes from './components/AdminNotes'
import Navigation from './components/Navigation'
import NavSignedIn from './components/NavSignedIn'

export const GlobalCtx = React.createContext(null)


function App() {
  const [gState, setgState] = React.useState({
    url: "http://localhost:3000", 
    token: false, 
    user: null, 
    admin: null, 
    error: null
  })
  
  React.useEffect(()=>{
    const token = window.localStorage.getItem("token")
    const user = JSON.parse(window.localStorage.getItem("user"))
   //console.log(user)
   if (token){
     setgState({...gState, token: true, user: user})
   } else {
     setgState({...gState, token: false, user: null})
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
        <Route path="/" exact component={Login} />
        <Route path="/notes" exact component={Notes} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/adminnotes" exact component={AdminNotes} />
        
      </Switch>
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
