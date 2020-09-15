//no
import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';
import {IconButton} from "@material-ui/core";
import {BiArrowBack} from "react-icons/all";



export default class EditComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.MyComment.id,
            title: props.MyComment.title,
            content: props.MyComment.content,
            published: props.MyPost.published,
            author: props.MyComment.author,
            authorId: props.MyComment.authorId,
            postId: this.props.MyPost.id,
            userId: this.props.userId,
            resp: null
        };


    }
    back = (e) => {
        this.props.history.push("/post/" + this.state.postId)
    }

    EditTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    }

    EditContent = (e) => {
        this.setState({
            content: e.target.value,
        });
    }




    SaveEditComment = (e) => {
        const {id,title,content,author,userId,postId} = this.state
        const Url = "http://localhost:5000/editcomment";
        //const Url = "/editcomment";
        const data = {
            id:id,
            title:title,
            content:content,
            published:new Date().toLocaleString(),
            author:author,
            authorId:userId,
            postId:postId,
        }

        axios.post(Url, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        post: [res.data],
                    });
                    // this.props.history.push("/")
                    this.props.history.push("/")
                }
            })
            .catch((err) => {
                alert("Error: failed to edit comment.")
            });
    }

    render() {
        if(this.state) {
            const {title,content} = this.state
            return (
                <div>
                    <h2>Edit your Post</h2>
                    <div>
                        {console.log(this.props)}
                        <p>title: <input defaultValue={title} type="text" onChange={this.EditTitle} required/><br/></p>
                        <p> content: <input defaultValue={content}  type="text" onChange={this.EditContent} required/><br/></p>
                    </div>
                    <button onClick={this.SaveEditComment}>save Comment</button>
                    <br/>
                    <IconButton onClick={this.back} >   <BiArrowBack/>   </IconButton>
                </div>
            );
        }
    }
}