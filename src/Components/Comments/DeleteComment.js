//yes
import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';
import {AiFillDelete,MdDeleteForever} from "react-icons/all";
import { IconButton } from '@material-ui/core';



export default class DeleteComment extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            commentId:this.props.MyComment.id,
            postId:this.props.MyComment.post_id,
            resp: null
        };




    }

    NoDeleteComment = (e) => {
        this.props.history.push("/post/" + this.state.postId)
    }



    DeleteComment = (e) => {
        const {commentId,resp,postId} = this.state
        const Url = "http://localhost:5000/deletecomment";
        // const Url = "/deletecomment"

        const data = {
            postId:postId,
            commentId:commentId,
        }
        axios.post(Url, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        resp: "Succeed to delete comment.",
                    });
                    alert(this.state.resp)
                    // this.props.history.push("/")
                    this.props.history.push("/post/" + this.state.postId)
                }
            })
            .catch((err) => {
                this.setState({
                    resp: "Error: failed to delete comment."
                });
            });
    }

    render() {
        if(this.state) {
            return (
                <div>
                    <h2>The post will be deleted</h2>
                    <IconButton onClick={this.DeleteComment}>  <AiFillDelete /> yes  </IconButton>
                    <IconButton onClick={this.NoDeleteComment}> <MdDeleteForever/> No </IconButton>
                    <br/>
                </div>
            );
        }
    }
}