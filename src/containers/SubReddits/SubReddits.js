import React, { Component } from "react";
import axios from 'axios';
import SubReddit from '../../components/SubReddit/SubReddit';
import './SubReddits.css';
import Posts from '../../components/Posts/Posts';

class SubReddits extends Component {
    state = {
        subReddits : [],
        selectedSubRedditUrl: null
    }
    componentDidMount(){
        axios.get('https://www.reddit.com/subreddits/popular.json')
            .then(response => {
                this.setState({subReddits: response.data.data.children})
            })
            .catch(error => {
                console.log(error);
            });
    }

    subRedditSelectedHandler = (url) => {
        this.setState({selectedSubRedditUrl: url});
    }

    render() {
        const subs = this.state.subReddits.map(sub => {
            return <SubReddit title={sub.data.title}
                key = {sub.data.id}
                clicked={() => this.subRedditSelectedHandler(sub.data.url)}/>
        });
        return (
            <div>
            <section className="SubReddits">
                {subs}
            </section>
            <hr style={{borderTop: '1px solid lightgray', width: '80%'}}/>
            <section>
                <Posts url={this.state.selectedSubRedditUrl}/>
            </section>
            </div>
        );
    }

}


export default SubReddits;