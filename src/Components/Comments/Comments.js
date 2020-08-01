import React, {Component} from 'react';
import axios from 'axios';
import "../Stylies/posts.css";
import Comment from "./Comment";

export default class Comments extends Component{
    constructor(props) {
        super(props);
        this.state = {
            MyComment:this.props.MyComment,
            username:this.props.username,
            userId:this.props.userId,
            data: [],
            resp: false,
            isLoggedIn: this.props.isLoggedIn,
            postId :this.props.postId,
            onSaveComment:this.props.onSaveComment,
        };
        // console.log("username from comments" + this.state.username)

    }

    componentDidMount () {
        const {postId} = this.state
        const Url = "http://localhost:5000/comment/" + postId
        //const Url = "/comment/" + post_id

        axios.get(Url)
            .then((res) => {
                if (res.status === 200) {
                    console.log( "this is res.data   " + res.data)
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
               // alert("no comments yet")
            });
    }


    render() {
        if (this.state ) {
            const {resp,data,isLoggedIn,userId,username,postId,onSaveComment,MyComment} = this.state;
            console.log("from Comments: data =  = "  + data)
            return (
                <div>
                    {
                        resp &&
                    data.map(((comment, index) =>
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
                            author_id={comment.authorId}
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