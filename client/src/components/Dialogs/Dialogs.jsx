import React from 'react';
import styles from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'


const Dialogs = (props) => {
    let state = props.store.getState()
    let dialogsElements = state.dialogsPage.dialogsData.map(d => <Dialog key = {d.id} name={d.name} dialogid={d.id} profile_picture={d.profile_picture}/>)

    return (
        <div>
            <h4>Dialogs and chat rooms</h4>
            <hr/>
            <div className={styles.dialogs}>
                <div className={styles.dialogsItems}>
                    <label className={styles.column_type}>Dialogs</label>
                    <hr/>
                    { dialogsElements }
                </div>

            </div>
    </div>
    )
}

export default Dialogs;
