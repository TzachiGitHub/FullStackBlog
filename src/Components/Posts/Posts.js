import axios from 'axios';
import Post from "./Post";
import "../Stylies/posts.css"
import React, {Component} from 'react';
import {CardDeck} from "react-bootstrap";
import {Link} from "react-router-dom";
import {UrlPosts} from "../Rejistration/Urls"

export default class Posts extends Component{
    constructor(props) {
        super(props);
        const {onSavePost,isLoggedIn,onSaveTags,myTags,onSaveComment,username,MyPost} =this.props
        this.state = {
            data: [],
            tags:null,
            // comments:0,
            resp: false,
            forsearch:"",
            MyPost:MyPost,
            forhome:false,
            myTags:myTags,
            username:username,
            onSavePost:onSavePost,
            isLoggedIn:isLoggedIn,
            onSaveTags:onSaveTags,
            onSaveComment:onSaveComment,
        };
    }
    handleChange = (e) => {
        this.setState({
            forsearch: e.target.value
        })
    }



    componentDidMount () {
      //  const UrlPosts = "http://localhost:5000/posts"
        //const UrlPosts = "/posts"
        axios.get(UrlPosts)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        data: (res.data).reverse(),
                        forhome:true,
                        resp: true,
                    })
                }
            })
            .catch(err => {
                this.setState({
                    data: [],
                    resp: false
                });
                console.error(err);
            });
    }


    render() {

        const {onSavePost,onSaveTags ,data, resp, isLoggedIn,tags,myTags,forhome,onSaveComment,username,MyPost} = this.state;
        const {forsearch} = this.state
        if (this.state && resp) {
            return (

                    <div>
                        <div className="search">
                            <input  type="text" onChange={this.handleChange} placeholder={"Enter word to search in"}/>
                            <Link to={(props) => `contentsearch/${forsearch}`}>
                                <button type="button" > contents </button>
                                <Link to={(props) => `titlesearch/${forsearch}`}>
                                    <button type="button" > titles </button>
                                </Link>
                            </Link>

                        </div>
                        <br/>
                        <br/>


                        <CardDeck>
                        {data.map(((post, index) =>
                            <Post
                                tags={tags}
                                post={post}
                                key={index}
                                id={post.id}
                                MyPost={MyPost}
                                myTags={myTags}
                                forhome={forhome}
                                title={post.title}
                                username={username}
                                watchs={post.watchs}
                                author={post.author}
                                content={post.content}
                                isLoggedIn={isLoggedIn}
                                onSaveTags={onSaveTags}
                                onSavePost={onSavePost}
                                imageUrl={post.imageUrl}
                                comments={post.comments}
                                myPost={this.props.MyPost}
                                published={post.published}
                                onSaveComment={onSaveComment}
                             />))


                        }</CardDeck>
                    </div>
                )
        }else {
            return null
        }
    }
}