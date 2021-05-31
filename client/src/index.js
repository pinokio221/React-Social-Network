import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { HashRouter } from 'react-router-dom'

class Title extends React.Component {
    render() {
        document.title = 'Chilltime - social network'
        return null;
    }
}
ReactDOM.render(
    <HashRouter>
    <Provider store={store}>
        <App store={store}/>
        <Title />
    </Provider>
    </HashRouter>, document.getElementById('root')
);










// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
