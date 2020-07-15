import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class Delete extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.props.myPost")
        console.log(this.props.myPost)
        this.state = {
            postId: this.props.myPost.id,
            userId: this.props.userId,
            resp: null
        };
        // console.log("from delete postId:")
        // console.log(this.state.postId)


    }
    postEmpy = (e) => {
        const localUrl = "http://localhost:5000/posts";
        axios.get(localUrl, )
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        resp: false
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    resp: true
                });
            });
        return this.resp
    }





    DeletePost = (e) => {
        const {postId} = this.state
        console.log("from delete postId:")
        console.log(postId)
        const localUrl = "http://localhost:5000/delete/" + postId;
        const data = {
            title: this.state.title,
            content: this.state.content,
            author:this.state.author,
            authorId:this.state.authorId,
            postId: this.state.postId,
        }
        axios.post(localUrl, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        resp: "Success: succeed to delete post.",


                    });
                    alert(this.state.resp)
                    const {isempty} = this.postEmpy()
                    console.log("isempty")
                    console.log(isempty)
                    this.props.history.push("/post/" + postId)
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
                    <h2>Delete your Post</h2>
                    <button onClick={this.DeletePost}>Delete Post</button>
                    <br/>
                </div>
            );
        }
    }
}