import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';
import {BiArrowBack} from "react-icons/all";
import {IconButton} from "@material-ui/core";
import {UrlEditComment} from "../Rejistration/Urls"




export default class EditComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             resp: null,
             userId: this.props.userId,
             id:this.props.MyComment.id,
             title: props.MyComment.title,
             author: props.MyComment.author,
             content: props.MyComment.content,
             authorId: props.MyComment.authorId,
             postId: this.props.MyComment.post_id,
             published: props.MyComment.published,
        };
    }
    back = (e) => {
        this.props.history.push("/post/" + this.props.MyComment.post_id)
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
        // const UrlEditComment = "http://localhost:5000/editcomment";
        //const UrlEditComment = "/editcomment";
        const data = {
            id:id,
            title:title,
            content:content,
            published:new Date().toLocaleString(),
            author:author,
            authorId:userId,
            postId:postId,
        }

        axios.post(UrlEditComment, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        post: [res.data],
                    });
                    this.props.history.push("/post/" + this.state.postId)
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
                    <br/>
                    <br/>
                    <h2>Edit your Comment</h2>
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