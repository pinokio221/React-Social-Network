import React from 'react';
import styles from './Dialogs.module.css'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";
import { getProfileDialogs, getProfileContacts } from '../../redux/dialogs-reducer';

class DialogsContainer extends React.Component {
    componentDidMount() {
        this.props.getProfileDialogs();
        this.props.getProfileContacts(this.props.userId);
    }
    render() {
        return(
            <Dialogs {...this.props}/>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        dialogsData: state.dialogsPage.dialogsData,
        contactsData: state.dialogsPage.contactsData,
        dialogsCount: state.dialogsPage.dialogsCount,
        dialogsIsFetching: state.dialogsPage.dialogsIsFetching
    }
    
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getProfileDialogs, getProfileContacts })
)(DialogsContainer);
