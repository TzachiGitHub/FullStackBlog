//yes
import React, {Component} from 'react';
import axios from 'axios';
import "../Stylies/posts.css";
import Comment from "./Comment";


export default class Comments extends Component{
    constructor(props) {
        super(props);
        const {MyComment,username,userId,isLoggedIn,postId,onSaveComment} = this.props
        this.state = {
            data: [],
            resp: false,
            userId:userId,
            postId:postId,
            username:username,
            MyComment:MyComment,
            isLoggedIn:isLoggedIn,
            onSaveComment:onSaveComment,
        };


    }

    componentDidMount () {
        const {postId} = this.state
        const Url = "http://localhost:5000/comment/" + postId
        //const Url = "/comment/" + postId


        axios.get(Url)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        data: res.data,
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
            const {resp,data,isLoggedIn,userId,username,postId,onSaveComment,MyComment} = this.state;
            return (
                <div>
                    {resp && data.map(((comment, index) =>
                        <Comment
                            key={index}
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