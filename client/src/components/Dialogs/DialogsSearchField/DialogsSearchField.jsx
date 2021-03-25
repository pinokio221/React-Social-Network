import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import styles from './DialogsSearchField.module.css'


const DialogsSearchField = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.field}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <SearchIcon />
            </Grid>
            <Grid item>
                <TextField size='medium' id="input-with-icon-grid" label="Search in messages..." />
            </Grid>
            </Grid></div>
        </div>
    )
}

export default DialogsSearchField;