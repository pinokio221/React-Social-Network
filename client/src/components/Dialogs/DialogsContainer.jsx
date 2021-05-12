import React from 'react';
import styles from './Dialogs.module.css'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";
import { getProfileDialogs, getProfileContacts, fetchMoreDialogs, fetchMoreContacts } from '../../redux/dialogs-reducer';

class DialogsContainer extends React.Component {
    state = {
        dialogsPagination: 1,
        contactsPagination: 1,
        hasMoreDialogs: true,
        hasMoreContacts: true,
    }
    componentDidMount() {
        this.props.getProfileDialogs(this.state.dialogsPagination);
        this.props.getProfileContacts(this.props.userId, this.state.contactsPagination); // infinite scroll needed
    }
    fetchMoreDialogs = () => {
        if(this.props.dialogsData.length >= this.props.dialogsCount) {
            this.setState({ hasMoreDialogs: false });
            return;
        }
        setTimeout(() => {
            this.setState({
                dialogsPagination: this.state.dialogsPagination+=1
            })
            this.props.fetchMoreDialogs(this.state.dialogsPagination);
        }, 1000)
    }
    fetchMoreContacts = () => {
        if(this.props.contactsData.length >= this.props.contactsCount) {
            this.setState({ hasMoreContacts: false });
            return;
        }
        setTimeout(() => {
            this.setState({
                contactsPagination: this.state.contactsPagination+=1
            })
            this.props.getProfileContacts(this.props.userId, this.state.contactsPagination);
        }, 1000)
    }
    render() {
        return(
            <Dialogs 
                {...this.props}
                fetchMoreDialogs={this.fetchMoreDialogs}
                fetchMoreContacts={this.fetchMoreContacts}
                hasMoreDialogs={this.state.hasMoreDialogs}
                hasMoreContacts={this.state.hasMoreContacts}
                dialogsCount={this.props.dialogsCount}
                contactsCount={this.props.contactsCount}
            />
        )
    }
}
let mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        dialogsData: state.dialogsPage.dialogsData,
        contactsData: state.dialogsPage.contactsData,
        dialogsCount: state.dialogsPage.dialogsCount,
        contactsCount: state.dialogsPage.totalContacts,
        dialogsIsFetching: state.dialogsPage.dialogsIsFetching
    }
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { 
        getProfileDialogs, 
        getProfileContacts, 
        fetchMoreDialogs,
        fetchMoreContacts
     })
)(DialogsContainer);
