import React from  'react';
import './SubReddit.css';
 
const subreddit = (props) => (
    <article className="SubReddit" onClick={props.clicked} >
        <h1>{props.title}</h1>
    </article>
);

export default subreddit;