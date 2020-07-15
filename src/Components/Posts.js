import React, {Component} from 'react';
import axios from 'axios';
import Post from "../hw4/Post";
import "../Stylies/posts.css";

export default class Posts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            resp: false,
            isLoggedIn: this.props.isLoggedIn,
        };
    }

    componentDidMount () {
        const {isLoggedIn}= this.state
        //console.log("isLoggedIn from posts" + isLoggedIn)
        const localUrl = "http://localhost:5000/posts"
        //const deployUrl = "/posts"

        axios.get(localUrl)
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
        if (this.state) {
           const {data, resp, isLoggedIn} = this.state;
            // console.log("from Posts: resp = " + resp)
            return (
                    <div>
                        {resp &&
                        data.map((post =>
                            <Post
                                post={post}
                                savePost={this.props.savePost}
                                title={post.title}
                                content={post.content}
                                published={post.published}
                                author={post.author}
                                imageurl={post.imageurl}
                                id={post.id}
                                isLoggedIn={isLoggedIn}
                            />))
                        }
                    </div>)
        }
    }
}