import React from 'react';
import connect from "react-redux/lib/connect/connect";
import { compose } from 'redux';
import { initialize } from '../src/redux/auth-reducer'
import withRouter from "react-router-dom/withRouter"
import './App.css';
import Navigate from './components/Navigate/Navigate'
import News from './components/News/News'
import FriendsContainer from './components/Friends/FriendsContainer'
import SettingsContainer from './components/Settings/SettingsContainer'
import {Route, Switch, Redirect} from 'react-router-dom'
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import store from './redux/redux-store'
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import RegisterContainer from './components/Register/RegisterContainer';
import MessagesContainer from './components/Dialogs/Messages/MessagesContainer';
import { CircularProgress } from '@material-ui/core';

class App extends React.Component {
  componentDidMount() {
    this.props.initialize();
  }
  render() {
    if(this.props.initialized) {
      return(
        <Switch>
        <Route exact path='/login' component={LoginPage}/>
        <Route exact path='/signup' component={RegisterPage}/>
          <div className="App">
            <Route component={DefaultContainer}/>
          </div>
        </Switch>
        )
      }
    else {
      return(
        <div className='loader'>
          <CircularProgress size={100}/>
        </div>
      )
    }
  }
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
          <Route exact path='/dialogs/:receiveId' render={ () =>
              <MessagesContainer store={store}/> } />
          <Route path='/news' render={ () => <News /> } />
          <Route exact path='/friends/:userId?' render={ () => 
              <FriendsContainer store={store}/> } />
          <Route path='/settings' render={ () => <SettingsContainer store={store} /> } />
          <Route path='/users' render={ () => <UsersContainer store={store}/> } />
      </div>
    </div>
  </div>
  )
  
}

let mapStateToProps = (state) => {
    return {
      authData: state.auth,
      initialized: state.auth.initialized
    }
}

export default compose(
  connect(mapStateToProps, { initialize }),
  withRouter
)(App)

// simple comment
