import React from 'react';

const fullpost = (props) => (
    <div>
        <label>Title</label>
        <input value={props.title || ''}  type="text"/>
        <label>Content</label>
        <textarea value={props.content || ''} rows="8"/>
        <p>Author: {props.author}</p>
        <img src={props.image} alt="postImage"/>
    </div>
);


export default fullpost;