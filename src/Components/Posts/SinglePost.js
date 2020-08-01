import React, {Component} from 'react';
import "../Stylies/posts.css"
import axios from 'axios';
import {Link} from 'react-router-dom'

import Comments from "../Comments/Comments";
import "../Stylies/posts.css";


export default class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resp: false,
            MyPost: this.props.MyPost,
            userId: this.props.userId,
            postId: this.props.match.params.id,
            isLoggedIn: this.props.isLoggedIn,
            username:this.props.username,
            onSaveComment:this.props.onSaveComment,
            tags:null,

        };


    }

    componentDidMount () {

        const {postId} = this.state
        const Url = "http://localhost:5000/post/" + postId ;
        //const Url = "/post/" + postId ;
        axios.get(Url,)
            .then((res) => {
                this.setState({
                    MyPost: res.data,
                    resp: true,
                    savePost: this.props.savePost,
                    onSaveComment:this.props.onSaveComment
                });
            })
            .catch((err) => {
                this.setState({
                    resp: false,
                });
            });
    }

    render() {
        const {resp,isLoggedIn,userId,postId,username,onSaveComment,MyComment,tags} = this.state
        if (resp && this.state && this.props.MyPost) {
            const {title, content, published, author, imageUrl, authorId} = this.state.MyPost
            return (
                <div className={"post"}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <h5>This post has been published in {published}  by {author}</h5>
                        <img src={imageUrl} alt="problem Loading Image..."/>
                        <p>{tags}</p>


                    {isLoggedIn && authorId == userId &&
                    <Link to='/editpost'> Edit </Link>}


                    {isLoggedIn && authorId == userId &&

                    <Link to='/deletepost'>| Delete </Link>
                    }

                    <Comments  MyComment={MyComment} onSaveComment={onSaveComment} username={username}  isLoggedIn={isLoggedIn} userId={userId} postId={postId}/>

                    {isLoggedIn &&
                    <Link to='/newcomment'>
                        new comment
                    </Link>
                    }


                </div>

            );
        }else{
            return <div> Loading..</div>
        }
    }
}