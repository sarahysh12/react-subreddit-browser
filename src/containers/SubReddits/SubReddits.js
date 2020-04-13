import React, { Component } from "react";
import axios from 'axios';
import SubReddit from '../../components/SubReddit/SubReddit';
import './SubReddits.css';
import Search from '../../components/Search/Search';

class SubReddits extends Component {
    state = {
        subReddits : [],
        filteredSubs: [],
        selectedSubRedditUrl: null
    }
    componentDidMount(){
        axios.get('https://www.reddit.com/subreddits/popular.json')
            .then(response => {
                this.setState({subReddits: response.data.data.children})
                this.setState({filteredSubs: response.data.data.children})
            })
            .catch(error => {
                console.log(error);
            });
    }

    subRedditSelectedHandler = (url) => {
        this.setState({selectedSubRedditUrl: url});
        this.props.history.push({pathname: url});
    }

    onSearchHandler = (keyword) => {
        console.log()
        var regex = new RegExp(keyword);
        let searchResult = [];
        this.state.subReddits.some(sub => {
            if(sub.data.title.toLowerCase().match(regex)){
                searchResult.push(sub)
            }
        });
        this.setState({filteredSubs: searchResult})
    }

  
    render() {
        const subs = this.state.filteredSubs.map(sub => {
            return <SubReddit title={sub.data.title}
                key = {sub.data.id}
                clicked={() => this.subRedditSelectedHandler(sub.data.url)}/>
        });

        return (
            <div>
                <Search changed={this.onSearchHandler}/>
                <section className="SubReddits">
                    {subs}
                </section>
                <hr style={{borderTop: '1px solid lightgray', width: '80%'}}/>

            </div>

        );
    }

}


export default SubReddits;