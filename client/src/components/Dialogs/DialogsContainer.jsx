import React from 'react';
import styles from './Dialogs.module.css'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";
import { getProfileDialogs } from '../../redux/dialogs-reducer';

class DialogsContainer extends React.Component {
    componentDidMount() {
        this.props.getProfileDialogs();
    }
    render() {
        return(
            <Dialogs {...this.props}/>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        dialogsCount: state.dialogsPage.dialogsCount,
        dialogsIsFetching: state.dialogsPage.dialogsIsFetching
    }
    
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getProfileDialogs })
)(DialogsContainer);
