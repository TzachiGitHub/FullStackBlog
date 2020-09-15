import axios from 'axios';
import Post from "./Post";
import "../Stylies/posts.css"
import React, {Component} from 'react';
import {CardDeck} from "react-bootstrap";


export default class Posts extends Component{
    constructor(props) {
        super(props);
        const {onSavePost,isLoggedIn,onSaveTags,myTags,onSaveComment,username} =this.props
        this.state = {
            data: [],
            tags:null,
            comments:0,
            resp: false,
            forhome:false,
            myTags:myTags,
            username:username,
            onSavePost:onSavePost,
            isLoggedIn:isLoggedIn,
            onSaveTags:onSaveTags,
            onSaveComment:onSaveComment,
        };
    }



    componentDidMount () {
       const Url = "http://localhost:5000/posts"
        //const Url = "/posts"
        axios.get(Url)
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
        const {onSavePost,onSaveTags ,data, resp, isLoggedIn,tags,myTags,forhome,onSaveComment,username} = this.state;
        if (this.state && resp) {
            return (

                    <div>

                        <CardDeck>
                        {data.map(((post, index) =>
                            <Post
                                tags={tags}
                                post={post}
                                key={index}
                                id={post.id}
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