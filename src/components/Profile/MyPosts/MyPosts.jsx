import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

    let postsElements =
        props.postsData.map(p =>  <Post message ={p.message} likesCount = {p.likesCount}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div><textarea></textarea></div>
                <button>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
      </div>
    );

}

export default MyPosts;