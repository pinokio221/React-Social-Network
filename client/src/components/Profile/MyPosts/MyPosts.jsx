import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Button, Form} from "react-bootstrap";

const MyPosts = (props) => {
    let postsElements =
        props.postsData.map(p =>  <Post key = {p.id} content ={p.content} likesCount = {p.likes} commentsCount = {p.comments} repostsCount={p.reposts} userInfo={props.userInfo}/>)

    let newPostElement = React.createRef();
    
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} onChange={ props.updatePostContent(newPostElement.value) } ref={ newPostElement } value={props.newPostText} />
                    </Form.Group>
                </Form>
                
                <Button variant="info" onClick={props.addPost(props.newPostText)}>Add Post</Button>{' '}
                
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
      </div>
    );
}

export default MyPosts;