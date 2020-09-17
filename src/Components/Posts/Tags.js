import React from 'react';
import axios from "axios";
import Post from "./Post";
import "../Stylies/Comments.css"
import {CardDeck} from "react-bootstrap";
import {UrlTags} from "../Rejistration/Urls"



export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onSavePost:this.props.onSavePost,
            onSaveTags:this.props.onSaveTags,
            isLoggedIn:this.props.isLoggedIn,
            postsFromSearch:[],
            resp:false,

        }

    }


    componentDidMount() {
        this.props.respFromSearch.map(((tag, index) => {
           // const UrlTags = "http://localhost:5000/post/" + tag.id
            //const UrlTags = "/post/" + tag.id
            axios.get(UrlTags + tag.id)
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            postsFromSearch: this.state.postsFromSearch.concat( res.data),
                            resp: true,
                        });
                    }

                })
                .catch((err) => {
                    // console.log(err)
                    // alert("No match")
                });
        }))

    }




    render() {
        const {postsFromSearch,onSavePost,onSaveTags,isLoggedIn} = this.state
        if (true) {
            return (
                <div>
                    <CardDeck>
                    {this.state.resp && postsFromSearch.map(((post, index) =>
                        <Post
                            key={index}
                            post={post}
                            id={post.id}
                            title={post.title}
                            author={post.author}
                            watchs={post.watchs}
                            content={post.content}
                            onSaveTags={onSaveTags}
                            onSavePost={onSavePost}
                            isLoggedIn={isLoggedIn}
                            imageUrl={post.imageUrl}
                            comments={post.comments}
                            MyPost={this.props.MyPost}
                            published={post.published}

                        />))
                    }</CardDeck>
                </div>);


        }
    }

}

