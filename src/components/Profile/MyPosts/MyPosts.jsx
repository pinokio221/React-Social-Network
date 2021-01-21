import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements =
        props.postsData.map(p =>  <Post message ={p.message} likesCount = {p.likesCount}/>)

    let newPostElement = React.createRef();

    let addNewPost = () => {
        let text = newPostElement.current.value;
        props.dispatch({type: "ADD-POST"})
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = { type: "UPDATE-POST-TEXT", newText: text };
        props.dispatch(action);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div><textarea onChange={ onPostChange } ref={ newPostElement } value={props.newPostText}/></div>
                <button onClick={ addNewPost }>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
      </div>
    );
}

export default MyPosts;