import React, {Component} from 'react';
import axios from 'axios';
import Post from "../hw4/Post";
// import "../Stylies/posts.css";

export default class Posts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            resp: false,
            onSavePost: this.props.onSavePost,
            isLoggedIn: this.props.isLoggedIn,
        };
    }

    componentDidMount () {
        const {isLoggedIn}= this.state
        console.log("this.state from posts == ")
        console.log(this.state)
        //console.log("isLoggedIn from posts" + isLoggedIn)
        const Url = "http://localhost:5000/posts"
        //const Url = "/posts"

        axios.get(Url)
            .then((res) => {
                 console.log( "this is res.data   " + res.data)
                this.setState({
                    data: res.data,
                    resp: true
                });
            })
            .catch((err) => {
                this.setState({
                    data: [],
                    resp: false
                });
            });
    }


    render() {
        const {onSavePost ,data, resp, isLoggedIn} = this.state;
        if (this.state && resp) {
            return (
                    <div>
                        {data.map((post =>
                            <Post
                                onSavePost={onSavePost}
                                post={post}
                                MyPost={this.props.MyPost}
                                title={post.title}
                                content={post.content}
                                published={post.published}
                                author={post.author}
                                imageUrl={post.imageUrl}
                                id={post.id}
                                isLoggedIn={isLoggedIn}
                            />))
                        }
                    </div>)
        }else {
            return null
        }
    }
}