import React from 'react';
import styles from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Messages from './Messages/Messages'

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogsData.map(d => <Dialog name={d.name} dialogid={d.id}/>)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                { dialogsElements }
            </div>
        <Messages messagesData={props.state.messagesData}/>
    </div>
    )
}

export default Dialogs;