import React, {Component} from 'react';
import "../Stylies/posts.css"
import axios from 'axios';
import {Link} from 'react-router-dom'
import SingleComment from "../Components/SingleComment";
import Comments from "../Components/Comments";


export default class singlePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            myPost: null,
            isLoggedIn:this.props.isLoggedIn,
            resp: false,
            userId: this.props.userId,
        };
        console.log(this.state)
        console.log("this.id from singlepost == ")
        console.log(this.id)
    }

    componentDidMount () {

        const {id} = this.state
        console.log("id from singlepost")
        console.log(id)
        const {isLoggedIn} = this.state
        const localUrl = "http://localhost:5000/post/" + id;
        // const deployUrl = "/post/" + id
        axios.get(localUrl)
            .then((res) => {
                this.setState({
                    myPost: res.data,
                    resp: true,
                    savePost: this.props.savePost,
                    saveComment:this.props.saveComment
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render() {
        const {myPost} = this.state
        if (this.state && myPost) {
            console.log("this.state.myPost.id from isnglepost == ")
            console.log(myPost)
            // console.log("authorId from singelpost" + this.state.myPost.authorId)
            // console.log("Id from singelpost" + this.state.id)
             const {title, content, published, author, imageUrl,isLoggedIn} = this.state.myPost
           //  const {title,content,author} = this.state.myComment
            return (
                <div>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <h5>This post has been published {published} by {author}</h5>
                    <img src={imageUrl} alt="problem Loading Image..."/>


                    {this.props.isLoggedIn && this.state.myPost.authorId == this.state.userId &&
                    <Link
                        to='/edit'>
                        Edit
                    </Link>
                    }

                    {this.props.isLoggedIn && this.state.myPost.authorId == this.state.userId &&
                    <Link
                        to='/delete'>
                          | Delete
                    </Link>
                    }
                    <Comments post_id ={this.state.id}/>
                    {this.props.isLoggedIn &&
                    <Link
                        onClick={(props) => {
                            this.props.saveComment(this.state.myComment)
                        }}
                        to={() => `/newComment/${this.state.id}`}> new comment
                    </Link>
                    }


                </div>

            );
        }else{
            return <div> Loading..</div>
        }
    }
}