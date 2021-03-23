import React from 'react';
import './App.css';
import Navigate from './components/Navigate/Navigate'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import store from './redux/redux-store'
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import RegisterContainer from './components/Register/RegisterContainer';
import MessagesContainer from './components/Dialogs/Messages/MessagesContainer';
import SuccessRegistrationAlert from "../src/components/Alerts/SuccessRegistrationAlert"


const App = () => {
  return(
  <BrowserRouter>
    <Switch>
    <Route exact path='/login' component={LoginPage}/>
    <Route exact path='/signup' component={RegisterPage}/>
      <div className="App">
        <Route component={DefaultContainer}/>
      </div>
    </Switch>
  </BrowserRouter>
  )
}


const LoginPage = () => {
  return(
    <div>
      <Route exact path='/' render={ () => <Redirect to="/login"/> } />
      <Route path="/login" render={ () => <LoginContainer store={store}/>}/>
    </div>
  )
}

const RegisterPage = () => {
  return(
    <div>
      <Route exact path='/' render={ () => <Redirect to="/signup"/> } />
      <Route path="/signup" render={ () => <RegisterContainer store={store}/>}/>
    </div>
  )
}

const DefaultContainer = () => {
  return(
    <div>
    <div className = 'app-wrapper'>
        <HeaderContainer store={store}/>
        <Navigate />
      <div className='app-wrapper-content'>
        <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
          <Route exec path='/profile/:userId?' render={ () =>
              <ProfileContainer store={store}/> } />
          <Route exact path='/dialogs' render={ () =>
              <DialogsContainer store={store}/> } />
          <Route exact path='/dialogs/:dialogId' render={ () =>
              <MessagesContainer store={store}/> } />
          <Route path='/news' render={ () => <News /> } />
          <Route path='/music' render={ () => <Music /> } />
          <Route path='/settings' render={ () => <Settings /> } />
          <Route path='/users' render={ () => <UsersContainer store={store}/> } />
      </div>
    </div>
  </div>
  )
  
}

export default App;
