import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class DeletePost extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.props.myPost")
        console.log(this.props.MyPost)
        this.state = {
            postId: this.props.MyPost.id,
            userId: this.props.userId,
            resp: null
        };
         console.log("from delete postId:")
         console.log(this.state.postId)
        console.log(this.state.userId)


    }



    DeletePost = (e) => {
        const Url = "http://localhost:5000/deletepost";
        //const Url = "/delete/" + postId
        const data = {
            authorId:this.state.authorId,
            postId: this.state.postId,
        }
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
                    <br/>
                </div>
            );
        }
    }
}