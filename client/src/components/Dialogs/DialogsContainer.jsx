import React from 'react';
import styles from './Dialogs.module.css'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";


let mapStateToProps = (state) => {
    return null;
}
let mapDispatchToProps = (dispatch) => {
    return null;
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
