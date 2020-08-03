import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


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
        this.props.history.push("/post/" + this.state.postId)
    }
    DeletePost = (e) => {
       // const Url = "http://localhost:5000/deletepost";
        const Url = "/deletepost";
        const data = {
            authorId:this.state.authorId,
            postId: this.state.postId,
        }
        console.log("this.stare.authorId == " + this.state.authorId)
        console.log("this.state. postId ==" + this.state.postId)
        axios.post(Url, data)
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
            });
    }

    render() {
        if(this.state) {
            return (
                <div>
                    <h2>The post will be deleted</h2>
                    <button onClick={this.DeletePost}>Are you sure?</button>
                    <button onClick={this.NoDeletePost}> No </button>
                    <br/>
                </div>
            );
        }
    }
}