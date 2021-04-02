import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import styles from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Contact from './Contact/Contact'
import DialogsSearchField from './DialogsSearchField/DialogsSearchField'
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
  }));

const Dialogs = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    let dialogsElements = props.dialogsData.map(d => <Dialog key = {d.id} receiveId = {d.id} name={d.first_name} profile_image={d.profile_image}/>)
    let contactsElements = props.contactsData.map(f => <Contact key = {f.id} receiveId = {f.id} name={f.first_name} fullname={f.fullname} profile_image={f.profile_image}/>)
    return (
        <div>
            <div className={styles.selectTab}>
                <AppBar position="static" color="default">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example">
                    <Tab icon={<QuestionAnswerIcon/>} label="Recent Dialogs" {...a11yProps(0)}/>
                    <Tab icon={<RecentActorsIcon/>} label="Contacts" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <div className={styles.tabContentWrap}>
                            <div><DialogsSearchField/></div>
                            <hr/>
                            <div className={styles.dialogsItems}>
                                {props.dialogsIsFetching ? <div className={styles.progress}><CircularProgress /></div> : dialogsElements}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <div className={styles.tabContentWrap}>
                            <div className={styles.contactsItems}>
                                {props.dialogsIsFetching ? <div className={styles.progress}><CircularProgress /></div> : contactsElements}
                            </div>
                        </div>
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    )
}

export default Dialogs;
