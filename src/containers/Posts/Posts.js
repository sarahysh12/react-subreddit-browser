import React, { Component } from "react";
import './Posts.css';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import {NavLink} from 'react-router-dom';

class Posts extends Component{
    state = {
        subreddit: '',
        loadedPosts : null,
        selectedPostId: null,
        error: false
    }

    componentWillMount() {
        const subName = '/r/' + this.props.match.params.name;
        this.setState({subreddit: subName});
        if (subName){
            if(!this.state.loadedPosts || (this.state.loadedPosts && subName !== ('/'+this.state.loadedPosts[0].data.subreddit_name_prefixed+'/'))){
                this.getPosts('hot', subName);
            }
        }  
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    onClickHotHandler (){
        this.setState({selectedPostId: null});
        this.getPosts('hot', this.state.subreddit);
    }

    onClickNewHandler (){
        this.setState({selectedPostId: null});
        this.getPosts('new', this.state.subreddit);
    }

    onSubmitHandler(event) {
        const keyword = event.target.value;
        this.getPosts('hot', keyword);
    }


    onSubmitSubReddit = event => {
        event.preventDefault();
        this.getPosts('hot', this.input.value);
    }


    getPosts(sortType, url) {
        axios.get('https://www.reddit.com'+url+'/'+sortType+'.json')
        .then(response => {
            const updatedPosts = response.data.data.children.map(post => {
                return {
                    data: post.data
                }
            });
            this.setState({loadedPosts: updatedPosts});
            this.setState({subreddit: url});
            this.setState({error: false});
            })
            .catch(error => {
                this.setState({error: true});
                console.log(error);
            });
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
        if(this.state.selectedPostId){
            posts = <div className="PostDetails"> <FullPost title={selectedPostTitle} content={selectedPostContent}
            author={selectedPostAuthor} image={selectedPostImage}/></div>
        }

        if(this.state.error === true){
            posts = <p style={{fontSize:'20px', color:'gray'}}>No Result Found</p>;
        }

        return (
            <div>
                <div className="PostsHeader">
                    <div className="PostHeaderTitle">
                        <h2><strong style={{color:'#CDA34F', fontSize: '26px'}}>{this.state.subreddit} </strong>{selectedPostTitle}</h2>
                    </div>
                    <div className="PostHeaderNavBar">
                        <button>
                            <NavLink 
                            to="/" style={{textDecoration: 'none', color: '#E9E7DA'}}>SubReddits</NavLink>
                        </button>
                        <button onClick={() => this.onClickHotHandler('hot', this.state.subreddit.id)}>Hot</button>
                        <button onClick={() => this.onClickNewHandler('new', this.state.subreddit.id)}>New</button>
                        <form onSubmit={this.onSubmitSubReddit}>
                            <label htmlFor="username"></label>
                            <input
                                type="text"
                                name="subreddit"
                                placeholder="Search for a subreddit"
                                ref={(input) => this.input = input}/>
                        </form>
                    </div>
                    
                </div>

                <div className="Posts">
                    <section>
                        {posts}
                    </section>
                </div>

            </div>
        );
    }
}

export default Posts;