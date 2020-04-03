import React, { Component } from "react";
import './Posts.css';
import axios from 'axios';
import Post from '../Post/Post';


class Posts extends Component{

    state = {
        loadedPosts : null

    }

    componentDidUpdate() {
        if (this.props.url){
                // if(this.state.posts){
                //     console.log(this.props.url.length, ('/'+this.state.posts[0].data.subreddit_name_prefixed+'/').length);
                // }
                if(!this.state.loadedPosts){
                    axios.get('https://www.reddit.com'+this.props.url+'hot.json')
                        .then(response => {
                            const updatedPosts = response.data.data.children.map(post => {
                                return {
                                    data: post.data
                                }
                            });
                            this.setState({loadedPosts: updatedPosts})
                            })
                            .catch(error => {
                                 console.log(error);
                            });
                }
        }     
    }

    render() {
        let posts = <p style={{color: 'gray', position: 'absolute', right: '40%'}}>Please select a SubReddit to view the posts!</p>
        if(this.state.loadedPosts){
            posts = this.state.loadedPosts.map(post =>{
                return <Post title={post.data.title}
                        key={post.data.id} />
            });
        }
        return (
            <div className="Posts">
                <section>
                    {posts}
                </section>
                <div className="PostDetails">
                    <label>Title</label>
                    <input type="text"/>
                    <label>Content</label>
                    <textarea rows="8"/>
                    <p>Author:</p>
                </div>
            </div>
        );
    }
}

export default Posts;