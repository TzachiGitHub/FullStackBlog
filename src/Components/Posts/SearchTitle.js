import React from "react";
import axios from "axios";
import Post from "./Post";
import {CardDeck} from "react-bootstrap";
import {UrlSearchTitle} from "../Rejistration/Urls"



export default class SearchTitle extends React.Component {
    constructor(props) {
        super(props);
        const {onSavePost, isLoggedIn, onSaveTags,MyPost} = this.props
        this.state = {
            MyPost:MyPost,
            respFromSearch: null,
            onSavePost:onSavePost,
            isLoggedIn:isLoggedIn,
            onSaveTags:onSaveTags,
            forSearch: this.props.match.params.word,
        }
    }

    componentDidMount () {
        const {forSearch} = this.state
       // const UrlSearchTitle = "http://localhost:5000/titlesearch/" + forSearch
       // const UrlSearchTitle = "/titlesearch/" +  forSearch

        axios.get(UrlSearchTitle + forSearch)
            .then((res ) => {
                if(res.status === 200){
                    this.setState({
                        respFromSearch: res.data,
                    });
                }

            })
            .catch((err) => {
                console.log(err)
                alert("No match")
                this.props.history.push('/')
            });
    }


    render() {
        console.log("respFromSearch = " + JSON.stringify(this.state.respFromSearch))
        const {respFromSearch,onSavePost,isLoggedIn,onSaveTags,MyPost} = this.state
        if (this.state && respFromSearch) {

            return (
                <div>
                    <br/>
                    <br/>
                    <CardDeck>
                    {respFromSearch.map(((post, index) =>

                        <Post
                            key={index}
                            id={post.id}
                            post={post}
                            MyPost={MyPost}
                            title={post.title}
                            author={post.author}
                            watchs={post.watchs}
                            content={post.content}
                            isLoggedIn={isLoggedIn}
                            onSaveTags={onSaveTags}
                            onSavePost={onSavePost}
                            imageUrl={post.imageUrl}
                            comments={post.comments}
                            published={post.published}

                        /> ))
                    }</CardDeck>
                </div>)
        }else {
            return <p> Loading Search Component..</p>
        }
    }
}