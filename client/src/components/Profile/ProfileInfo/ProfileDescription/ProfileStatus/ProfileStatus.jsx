import React from 'react';
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import styles from './ProfileStatus.module.css';


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    
    toggleEditMode = () => {
        if(this.state.editMode) {
            this.setState({
                editMode: false
            })
            
            this.props.updateProfileStatus(this.state.status)
        } else {
            this.setState({
                editMode: true
            })
        }
    }

    onStatusChange = (e) => {
        let value = e.currentTarget.value;
        this.setState({
            status: value
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }
    
    render() {
        return (
            <div>
                {this.state.editMode ?
                <div><Form.Control autoFocus onChange={this.onStatusChange} onBlur={this.toggleEditMode} value={this.state.status} className={styles.status_input} /></div> : 
                this.state.status ?
                    <div onClick = { this.toggleEditMode } className={styles.user_status}>
                    <span>{this.state.status}</span>
                    <FontAwesomeIcon className={styles.pencil_icon} icon={faPencilAlt}/></div> :
                    <span onClick = { this.toggleEditMode } className={styles.no_status}>change status</span>}
                      
            </div>
                
        );
    }
}


export default ProfileStatus;