import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Navigate from './components/Navigate/Navigate'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {Route} from 'react-router-dom'
import Dialogs from "./components/Dialogs/Dialogs";
import store from './redux/redux-store'
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';

const App = (props) => {
  return (
    <div className = 'app-wrapper'>
        <Header />
        <Navigate />
      <div className='app-wrapper-content'>
          <Route path='/profile/:userId?' render={ () =>
              <ProfileContainer store={store}/> } />
          <Route exact path='/dialogs' render={ () =>
              <Dialogs store={store}/> } />
          <Route path='/news' render={ () => <News /> } />
          <Route path='/music' render={ () => <Music /> } />
          <Route path='/settings' render={ () => <Settings /> } />
          <Route path='/users' render={ () => <UsersContainer store={store}/> } />
      </div>
      
  </div>
  );
}


export default App;
