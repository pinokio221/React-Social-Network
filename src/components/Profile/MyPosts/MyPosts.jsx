import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div>
            MyPosts
            <div>
                <textarea></textarea>
                <button>Add post</button>
                <button>Remove post</button>
            </div>
            <div className={s.posts}>
                <Post message = "Hello, how are you?" likes = '20'/>
                <Post message = "Please recall me!" likes = '15'/>
                <Post />
                <Post />
            </div>
      </div>
    );

}

export default MyPosts;