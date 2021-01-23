import React from 'react';
import styles from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Messages from './Messages/Messages'
import store from "../../redux/store";

const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;
    let dialogsElements = state.dialogsData.map(d => <Dialog name={d.name} dialogid={d.id} profile_picture={d.profile_picture}/>)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                { dialogsElements }
            </div>
        <Messages messagesData={state.messagesData} dispatch={props.store.dispatch.bind(store)}/>
    </div>
    )
}

export default Dialogs;