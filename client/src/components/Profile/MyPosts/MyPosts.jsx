import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {Button, Form } from "react-bootstrap";
import { Field, reduxForm } from "redux-form"
import { required, maxLengthCreator } from "../../../validators/validator"
import { ReduxTextArea } from '../../FormControls/ReduxFormControls'


const fieldMaxLength = maxLengthCreator(5000);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Form >
                <Form.Group controlId="postForm">
                    <Field component={ReduxTextArea} name='post' validate={[required, fieldMaxLength]}/>
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