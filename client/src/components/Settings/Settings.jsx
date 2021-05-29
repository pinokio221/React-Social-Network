import React from 'react';
import styles from './Settings.module.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const Settings = (props) => {
    const [state, setState] = React.useState({
        checkedB: props.settings.tfa,
      });

    const toggleTfaSetting = (event) => {
        let settings = {
            tfa: event.target.checked
        }
        props.updateSettings(settings);
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    let statusIcon = <ExitToAppIcon/>;
    if(props.authData.signOutInProcess){
        statusIcon = <div className={styles.progress}><CircularProgress size={20}/></div>
    }
    return (
        <div>
            <div className={styles.otherWrapper}>
                <div className={styles.tfaField}>
                    <div className={styles.tfaRow}>
                        <h5>Two-Factor-Authentication</h5>
                        <FormGroup row className={styles.tfaSwitch}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={state.checkedB}
                                    onChange={toggleTfaSetting}
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                            />
                        </FormGroup>
                    </div>
                    <div className={styles.signOutButton} onClick={props.userLogout}>
                        <span>SIGN OUT</span>
                        <span className={styles.signOutIcon}>{statusIcon}</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Settings;