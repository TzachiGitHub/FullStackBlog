import React, {Component} from 'react';
import axios from 'axios';
import Post from "./Post";
// import "../Stylies/posts.css";

export default class Posts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            resp: false,
            onSavePost: this.props.onSavePost,
            isLoggedIn: this.props.isLoggedIn,
            onSaveTags:this.props.onSaveTags,
            myTags:this.props.myTags,
            tags:null,
        };
        // console.log("this allPosts == " + this.props.allPosts)
        // console.log("this datafromserch == " + this.props.respfromSearch)
    }

    componentDidMount () {
        //const url = "http://localhost:5000/posts"
        const url = "/posts"
        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        data: res.data,
                        resp: true,
                    })
                }
            })
            .catch(err => {
                this.setState({
                    data: [],
                    resp: false
                });
                console.error(err);
            });
    }


    render() {
        const {onSavePost,onSaveTags ,data, resp, isLoggedIn,tags,myTags} = this.state;
        if (this.state && resp) {
            return (
                <div>
                    <div>
                        {data.map(((post, index) =>
                            <Post
                                onSaveTags={onSaveTags}
                                key={index}
                                onSavePost={onSavePost}
                                post={post}
                                myPost={this.props.MyPost}
                                title={post.title}
                                content={post.content}
                                published={post.published}
                                author={post.author}
                                imageUrl={post.imageUrl}
                                id={post.id}
                                isLoggedIn={isLoggedIn}
                                tags={tags}
                                myTags={myTags}
                            />))
                        }
                    </div>
                </div>)
        }else {
            return null
        }
    }
}