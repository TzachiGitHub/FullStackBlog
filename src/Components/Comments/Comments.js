import axios from 'axios';
import Comment from "./Comment";
import React, {Component} from 'react';
import {UrlComments} from "../Rejistration/Urls"


export default class Comments extends Component{
    constructor(props) {
        super(props);
        const {MyComment,username,userId,MyPost,isLoggedIn,postId,onSaveComment} = this.props
        this.state = {
            data: [],
            resp: false,
            userId:userId,
            postId:postId,
            MyPost:MyPost,
            username:username,
            MyComment:MyComment,
            isLoggedIn:isLoggedIn,
            onSaveComment:onSaveComment,
        };
    }

    componentDidMount () {
        const {postId} = this.state
        // const UrlComments = "http://localhost:5000/comment/" + postId
        //const UrlComments = "/comment/" + postId


        axios.get(UrlComments + postId)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        data: res.data.reverse(),
                        resp:true,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    data:[],
                    resp:false,
                });
                console.log(err)
            });
    }


    render() {
        if (this.state ) {
            const {resp,data,isLoggedIn,userId,username,postId,onSaveComment,MyComment,MyPost} = this.state;
            return (
                <div >
                    {resp && data.map(((comment, index) =>
                        <Comment
                            key={index}
                            MyPost={MyPost}
                            onSaveComment={onSaveComment}
                            comment={comment}
                            MyComment={MyComment}
                            commentId = {comment.id}
                            title = {comment.title}
                            content ={comment.content}
                            published ={comment.published}
                            postId={postId}
                            author = {comment.author}
                            // author_id={comment.authorId}
                            authorId={comment.authorId}
                            isLoggedIn={isLoggedIn}
                            username={username}
                            userId={userId}
                        />))
                   }
                </div>)
        }else{
            return null
        }
    }
}