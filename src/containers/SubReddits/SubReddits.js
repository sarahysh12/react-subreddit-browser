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
        const queryString = 'id='+url;
        this.props.history.push({
            pathname: '/posts',
            search: '?' + queryString
        })
    }

    //TODO fix the issue when you empty the seacrh bar
    //TODO add no result found
    //TODO what is autocomplete?
    onSearchHandler = (evt) => {
        const keyword = evt.target.value;
        var regex = new RegExp(keyword);
        let searchResult = [];
        this.state.subReddits.some(sub => {
            if(sub.data.title.toLowerCase().match(regex)){
                searchResult.push(sub)
            }
        });
        if (searchResult.length > 0){
            this.setState({subReddits: searchResult})
        }
    }

    render() {
        const subs = this.state.subReddits.map(sub => {
            return <SubReddit title={sub.data.title}
                key = {sub.data.id}
                clicked={() => this.subRedditSelectedHandler(sub.data.url)}/>
        });


        return (
            <div>
                <section className="SubredditsHeader" >
                <header>
                    <h1>SubReddits</h1>
                    <input type="text" placeholder="Search" onChange={this.onSearchHandler}/>
                </header>
                </section>
            <section className="SubReddits">
                {subs}
            </section>
            <hr style={{borderTop: '1px solid lightgray', width: '80%'}}/>
            </div>
        );
    }

}


export default SubReddits;