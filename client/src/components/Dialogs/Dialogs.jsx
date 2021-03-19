import React from 'react';
import styles from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress';

const Dialogs = (props) => {
    let dialogsElements = props.dialogsData.map(d => <Dialog key = {d.id} name={d.first_name} dialogid={d.dialogId} profile_image={d.profile_image}/>)

    return (
        <div>
            <div className={styles.dialogs}>
                <div className={styles.dialogsItems}>
                <label className={styles.dialogs_text}>Dialogs</label>
                    {props.dialogsIsFetching ? <div className={styles.progress}><CircularProgress /></div> : dialogsElements}
                </div>

            </div>
    </div>
    )
}

export default Dialogs;
