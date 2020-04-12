import React, { Component } from "react";
import './Posts.css';
import axios from 'axios';
import Post from '../Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import queryString from 'query-string';


class Posts extends Component{

    state = {
        subreddit: '',
        loadedPosts : null,
        selectedPostId: null
    }

    componentWillMount() {
        console.log('will mount');
        const url = queryString.parse(this.props.location.search);
        this.setState({subreddit: url});
        console.log(url);
        if (url.id){
            if(!this.state.loadedPosts || (this.state.loadedPosts && url.id !== ('/'+this.state.loadedPosts[0].data.subreddit_name_prefixed+'/'))){
                axios.get('https://www.reddit.com'+url.id+'hot.json')
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

    componentDidUpdate() {
        console.log('did update');
        // if (this.state.subreddit){
        //         if(!this.state.loadedPosts || (this.state.loadedPosts && this.state.subreddit !== ('/'+this.state.loadedPosts[0].data.subreddit_name_prefixed+'/'))){
        //             axios.get('https://www.reddit.com'+this.state.subreddit+'hot.json')
        //                 .then(response => {
        //                     const updatedPosts = response.data.data.children.map(post => {
        //                         return {
        //                             data: post.data
        //                         }
        //                     });
        //                     this.setState({loadedPosts: updatedPosts})
        //                     })
        //                     .catch(error => {
        //                          console.log(error);
        //                     });
        //         }
        // }     
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render() {
        let posts = null;
        let selectedPost = null;
        if(this.state.loadedPosts){
            posts = this.state.loadedPosts.map(post =>{
                return <Post title={post.data.title}
                        key={post.data.id} 
                        postSelected={() => this.postSelectedHandler(post.data.id)}/>
            });
        }
        let selectedPostTitle = '';
        let selectedPostContent= '';
        let selectedPostAuthor = '';
        let selectedPostImage = '';
        if(this.state.selectedPostId && this.state.loadedPosts) {
            selectedPost = this.state.loadedPosts.find(post => post.data.id === this.state.selectedPostId);
            if (selectedPost){
                selectedPostTitle = selectedPost.data.title;
                selectedPostContent  = selectedPost.data.selftext;
                if(selectedPostContent === ''){
                    selectedPostContent = 'No Description';
                }
                selectedPostAuthor = selectedPost.data.author_fullname;
                if (selectedPost.data.preview){
                    selectedPostImage = selectedPost.data.preview.images[0].source;
                }
            }
        }
        return (
            <div className="Posts">
                <section>
                    {posts}
                </section>
                <div className="PostDetails">
                    <FullPost 
                    title={selectedPostTitle}
                    content={selectedPostContent}
                    author={selectedPostAuthor}
                    image={selectedPostImage}
                    />
                </div>
            </div>
        );
    }
}

export default Posts;