import React from 'react';
import './App.css';
import Navigate from './components/Navigate/Navigate'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {Route} from 'react-router-dom'
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import store from './redux/redux-store'
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App = (props) => {
  return (
    <div className = 'app-wrapper'>
        <HeaderContainer store={store}/>
        <Navigate />
      <div className='app-wrapper-content'>
          <Route path='/profile/:userId?' render={ () =>
              <ProfileContainer store={store}/> } />
          <Route exact path='/dialogs' render={ () =>
              <DialogsContainer store={store}/> } />
          <Route path='/news' render={ () => <News /> } />
          <Route path='/music' render={ () => <Music /> } />
          <Route path='/settings' render={ () => <Settings /> } />
          <Route path='/users' render={ () => <UsersContainer store={store}/> } />
          <Route path='/login' render={ () => <Login /> } />
      </div>
      
  </div>
  );
}


export default App;
