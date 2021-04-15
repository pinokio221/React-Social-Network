import React from 'react';
import styles from './Friends.module.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BiMessageSquareAdd } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));


const Friends = (props) => {
    let isAuthUserPage = false;
    if(props.profilePageId === undefined || props.profilePageId == props.authData.id) {
        isAuthUserPage = true;
    }

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
            <div className={classes.root}>
                { isAuthUserPage === true ?
                  <div>
                    <div>
                      <AppBar position="static">
                        <Tabs variant='fullWidth' centered value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab icon={<FaUserFriends/>} label={`Friends(${props.friendsPage.totalFriends})`} {...a11yProps(0)} />
                        <Tab icon={<BiMessageSquareAdd/>} label={`Friendship invitations(${props.friendsPage.totalInvitations})`} {...a11yProps(1)} />
                        </Tabs>
                      </AppBar>
                    </div>
                    <div>
                      <TabPanel value={value} index={0}>
                      <div className={styles.contentBlock}>
                        {props.friends}
                      </div>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <div className={styles.contentBlock}>
                          {props.invitations}
                        </div>
                      </TabPanel>
                    </div>
                </div>
              : null }
                
            </div>
    )
}

export default Friends;