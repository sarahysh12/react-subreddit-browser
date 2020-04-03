import React from  'react';
import './Post.css';
 
const post = (props) => (
    <article className="Post" onClick={props.postSelected}>
        <ul>
            <li>{props.title}</li>
        </ul>
    </article>
);

export default post;