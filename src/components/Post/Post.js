import React from  'react';
import './Post.css';
 
const post = (props) => (
    <article className="Post" onClick={props.postSelected}>
        {props.title}
    </article>
);

export default post;