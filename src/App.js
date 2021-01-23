import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Navigate from './components/Navigate/Navigate'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {Route} from 'react-router-dom'


const App = (props) => {
  return (
    <div className = 'app-wrapper'>
        <Header />
        <Navigate />
      <div className='app-wrapper-content'>
          <Route path='/profile' render={ () =>
              <Profile store={props.store}/> } />
          <Route exact path='/dialogs' render={ () =>
              <Dialogs store={props.store}/> } />
          <Route path='/news' render={ () => <News /> } />
          <Route path='/music' render={ () => <Music /> } />
          <Route path='/settings' render={ () => <Settings /> } />
      </div>
      
  </div>
  );
}


export default App;
