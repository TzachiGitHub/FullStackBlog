import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';
import {UrlDeletePost} from"../Rejistration/Urls"


export default class DeletePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.MyPost.id,
            userId: this.props.userId,
            resp: null
        };
    }

    NoDeletePost = (e) => {
        this.props.history.push("/" )
    }

    DeletePost = (e) => {
        const {authorId,postId} = this.state
        // const UrlDeletePost = "http://localhost:5000/deletepost";
        //const UrlDeletePost = "/deletepost";
        const data = {
            authorId:authorId,
            postId: postId,
        }
        axios.post(UrlDeletePost, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        resp: "Success: succeed to delete post.",
                    });
                    alert(this.state.resp)
                    this.props.history.push("/")
                }
            })
            .catch((err) => {
                this.setState({
                    post: [],
                    resp: "Error: failed to delete post."
                });
                alert(this.state.resp)
            });
    }

    render() {
        if(this.state) {
            return (
                <div>
                    <br/>
                    <br/>
                    <h2>The post will be deleted</h2>
                    <br/>
                    <button onClick={this.DeletePost}>Are you sure ?</button>
                    <button onClick={this.NoDeletePost}> No </button>
                    <br/>
                </div>
            );
        }
    }
}