import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {Button, Form } from "react-bootstrap";
import { Field, reduxForm } from "redux-form"
import { required, maxLength } from "../../../validators/validator"
import ErrorIcon from '@material-ui/icons/Error';

const ReduxFormControl = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error;
    return <div className={styles.postForm + " " + (hasError ? styles.error : "")}>
            <div><Form.Control as={'textarea'} {...props} {...input} /></div>
            { hasError && <span><ErrorIcon/> { meta.error }</span> }
        </div>  
};

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Form >
                <Form.Group controlId="postForm">
                    <Field component={ReduxFormControl} name='post' validate={[required, maxLength]}/>
                </Form.Group>
            </Form>
        <Button type='submit' variant="info">Add Post</Button>
        </form>
    );
}

const PostReduxForm = reduxForm({
    form: 'post'
})(PostForm);



const MyPosts = (props) => {
    let postsElements =
        props.postsData.map(p =>  <Post 
            id = {p.id} 
            key = {p.id} 
            content ={p.content} 
            likesCount = {p.likes} 
            commentsCount = {p.comments} 
            repostsCount={p.reposts} 
            userInfo={props.userInfo}
            authId={props.authData.id}
            deletePost={props.deletePost}/>)
    
    let addPost = (values) => {
        props.addPost(values.post)
    }
    return (
        <div className={styles.postsBlock}>
            <h3>My Posts</h3>
            <PostReduxForm onSubmit={addPost}/>
            <div className={styles.posts}>
                {postsElements}
            </div>
      </div>
    );
}

export default MyPosts;