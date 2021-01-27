import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, onPostChangeActionCreator} from "../../../redux/profile-reducer";
import {Button, Form} from "react-bootstrap";

const MyPosts = (props) => {
    let postsElements =
        props.postsData.map(p =>  <Post message ={p.message} likesCount = {p.likesCount} userImage={props.userImage}/>)

    let newPostElement = React.createRef();
    
    let addNewPost = () => {
        props.dispatch(addPostActionCreator())
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(onPostChangeActionCreator(text));
    }
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} onChange={ onPostChange } ref={ newPostElement } value={props.newPostText} />
                    </Form.Group>
                </Form>
                <Button variant="info" onClick={addNewPost}>Add Post</Button>{' '}
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
      </div>
    );
}

export default MyPosts;