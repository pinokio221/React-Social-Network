import React from 'react';
import {Button, Image} from 'react-bootstrap'
import MaterialButton from '@material-ui/core/Button'
import styles from './ProfileDescription.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FiCrop } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        width: 'max-content',
    },
    input: {
        display: 'none',
      },
    icon: {
        marginLeft: '8px'
    },
    btn: {
        marginTop: '5px'
    },
    
    orig_img_container: {
        position: 'relative',
        width: 'auto',
        height: 'auto',
        maxWidth: '550px',
        maxHeight: '450px',
        marginBottom: '30px',
        overflowX: 'auto',
        overflowY: 'auto'
    },
    orig_img: {
        width: '100%',
        height: 'auto'
    },
    presentImage: {
        width: '200px',
        
    },
    presentBlock: {
        padding: '10px'
    },
    cropBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'max-content',
        marginLeft: '7%'
    },
    save_btn: {
        marginLeft: '10px'
    },
    crop_icon: {
        marginLeft: '5px'
    }
  }));


const ProfilePhotoCropper = (props) => {
    const classes = useStyles();
    const [image, setImage] = React.useState(null);
    const [crop, setCrop] = React.useState({ aspect: 1 / 1, width: 200 });
    const [result, setResult] = React.useState(null);

    const handleClose = () => {
        props.setOpen(false);
        props.selectFile(null);
    };

    const getCroppedImg = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        const resultImage = canvas.toDataURL('image/jpeg');
        setResult(resultImage);
    }

    const uploadImage = (e) => {
        e.preventDefault();
        props.updateProfilePicture(result);
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={true}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={true}>
                <form onSubmit={uploadImage}>
                    <div className={classes.paper}>
                        <div className={classes.content}>
                                <div>
                                    <div className={classes.orig_img_container}>
                                        <ReactCrop className={classes.orig_img} keepSelection={true} minWidth={50} maxWidth={500} circularCrop={true} src={props.file} onImageLoaded={setImage} crop={crop} onChange={setCrop}/>
                                    </div>
                                    <MaterialButton onClick={getCroppedImg} variant="contained" size="large" color="primary" className={classes.margin}>CROP <FiCrop className={classes.crop_icon}/></MaterialButton>
                                </div>
                                    <div>
                                        { result &&
                                        <div className={classes.cropBlock}>
                                            <label>Your profile picture will look like this:</label><br/>
                                            <div className={classes.presentBlock}>
                                                <Image className={classes.presentImage} src={result} roundedCircle/>
                                            </div>
                                            <div className={styles.cropModalButtons}>
                                                <MaterialButton onClick={handleClose} variant="contained" size="large">CANCEL</MaterialButton>
                                                <MaterialButton type='submit' variant="contained" size="large" color="primary" className={classes.save_btn}>SAVE</MaterialButton>
                                            </div>
                                    </div>
                                    }
                            </div>
                        
                    </div>
                    </div>
                    </form>
                </Fade>
                
            </Modal>
        </div>
    )
}

const ProfilePhotoUploadModal = (props) => {
    const classes = useStyles();
    
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        
                        <div className={classes.btn}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="uploaded_profile_picture"
                                onChange={props.handleFileChange}
                            />
                            <label htmlFor="contained-button-file">
                                <h3>User Profile Image</h3>
                                <span>Please choose the photo you want to set as profile picture.</span><br/><br/>
                                <center>
                                    <MaterialButton variant="contained" color="primary" component="span">
                                    UPLOAD PHOTO <PhotoCamera className={classes.icon}/>
                                </MaterialButton></center>
                            </label>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

const ProfilePhotoModal = (props) => {
    const [file, selectFile] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (e) => {
        selectFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            <Button  onClick={handleOpen} className={styles.change_photo_btn} variant="light">Change profile photo</Button>
            { !file ? 
                <ProfilePhotoUploadModal open={open} handleClose={handleClose} handleFileChange={handleFileChange}/> 
                : 
                <ProfilePhotoCropper updateProfilePicture={props.updateProfilePicture} selectFile={selectFile} file={file} setOpen={setOpen}/> }
        </div>
    )
}
export default ProfilePhotoModal;