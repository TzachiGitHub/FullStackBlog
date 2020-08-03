import React from "react";
import axios from "axios";
import Home from "./Home";
import Posts from "./Posts";
import Post from "./Post";
//import React, {Component} from 'react';

export default class SearchContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            respFromSearch: null,
            forSearch: this.props.match.params.word,
            onSavePost: this.props.onSavePost,
            isLoggedIn: this.props.isLoggedIn,
            onSaveTags:this.props.onSaveTags,
        }
        console.log(this.props)
        console.log(this.state)

    }

    componentDidMount () {
        //const Url = "http://localhost:5000/contentsearch/" + this.state.forSearch
        const Url = "/contentsearch/" +  this.state.forSearch

        axios.get(Url)
            .then((res) => {
                console.log( "this is res.data   ")
                console.log(res.data)
                if(res.status === 200){
                    this.setState({
                        respFromSearch: res.data,
                    });
                }

            })
            .catch((err) => {
                console.log(err)
                alert("No match")
            });
    }







    render() {

        if (this.state && this.state.respFromSearch) {
            const {respFromSearch,onSavePost,isLoggedIn,onSaveTags} = this.state
            return (
                <div>
                    {respFromSearch.map(((post, index) =>
                        <Post
                            key={index}
                            onSaveTags={onSaveTags}
                            onSavePost={onSavePost}
                            post={post}
                            MyPost={this.props.MyPost}
                            title={post.title}
                            content={post.content}
                            published={post.published}
                            author={post.author}
                            imageUrl={post.imageUrl}
                            id={post.id}
                            isLoggedIn={isLoggedIn}
                        />))
                    }
                </div>)
        }else {
            return <p> Loading Search Component..</p>
        }
    }
}