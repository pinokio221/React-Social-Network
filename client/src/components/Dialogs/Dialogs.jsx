import React from 'react';
import styles from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import MessagesContainer from "./Messages/MessagesContainer";

const Dialogs = (props) => {
    let state = props.store.getState()
    let dialogsElements = state.dialogsPage.dialogsData.map(d => <Dialog key = {d.id} name={d.name} dialogid={d.id} profile_picture={d.profile_picture}/>)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                { dialogsElements }
            </div>
        <MessagesContainer store={props.store}/>
    </div>
    )
}

export default Dialogs;