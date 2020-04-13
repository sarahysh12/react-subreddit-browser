import React from 'react';

const fullpost = (props) => (
    <div>
        <label>{props.title || ''} </label>
        <textarea style={{marginTop:'40px'}} value={props.content || ''} rows="10"/>
        <p style={{marginTop:'20px', color: '#CDA34F'}} >Author: {props.author}</p>
        <img style={{marginTop:'30px'}}  src={props.image} alt="postImage"/>
    </div>
);


export default fullpost;