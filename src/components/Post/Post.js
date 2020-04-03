import React from  'react';
import './Post.css';
 
const post = (props) => (
    <div>
        <article className="Post" >
            <ul>
                <li>{props.title}</li>
            </ul>
        </article>
    </div>
);

export default post;