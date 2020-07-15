import React, {Component} from 'react';
import axios from 'axios';
import "../Stylies/posts.css";
import Comment from "./Comment";

export default class Comments extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            resp: false,
            isLoggedIn: this.props.isLoggedIn,
            post_id :this.props.post_id
        };

    }

    componentDidMount () {
        const {post_id} =this.state
        const {isLoggedIn}= this.state
        console.log("isLoggedIn from comments" + isLoggedIn)
        const localUrl = "http://localhost:5000/comment/" + post_id
        //const deployUrl = "/comments"

        axios.get(localUrl)
            .then((res) => {
                console.log( "this is res.data   " + res.data)
                this.setState({
                    data: res.data,
                    resp: true
                });
                console.log("data from comments == ")
                console.log("from comments == ")
                console.log(this.state.data)
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
            console.log("from Comments: data =  = " + data)
            return (
                <div>
                    {resp &&
                    data.map((comment =>
                        <Comment
                            title = {comment.title}
                            content ={comment.content}
                            published ={comment.published}
                            author = {comment.author}
                            authorid={comment.authorId}
                            isLoggedIn = {isLoggedIn}
                        />))
                    }
                </div>)
        }
    }
}