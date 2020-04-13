import React, { Component } from 'react';
import './Search.css';

class Search extends Component {

    onChangeHandler = (evt) => {
        const keyword = evt.target.value;
        this.props.changed(keyword);
    }


    render() {

        return (
            <section className="SubredditsHeader" >
                <header>
                    <h1>SubReddits</h1>
                    <input type="text" placeholder="Search" onChange={this.onChangeHandler}/>
                </header>
            </section>
        );
    }
}

export default Search;