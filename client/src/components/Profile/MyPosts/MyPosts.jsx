import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Button, Form} from "react-bootstrap";
import { Field, reduxForm } from "redux-form"

const ReduxFormControl = ({input, meta, ...props}) => {
    return <Form.Control as={'textarea'} {...props} {...input} />
};


const PostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Form >
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Field component={ReduxFormControl} name='post'/>
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
        props.postsData.map(p =>  <Post key = {p.id} content ={p.content} likesCount = {p.likes} commentsCount = {p.comments} repostsCount={p.reposts} userInfo={props.userInfo}/>)
    
    let addPost = (values) => {
        props.addPost(values.post)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <PostReduxForm onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
      </div>
    );
}

export default MyPosts;