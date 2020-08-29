import React from 'react';
import "../Stylies/Comments.css"
import {Link} from 'react-router-dom'
import axios from "axios";
import Post from "./Post";
// import UrlTags from "../Rejistration/Urls"

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onSavePost:this.props.onSavePost,
            onSaveTags:this.props.onSaveTags,
            postsFromSearch:[],
            resp:false,

        }

    }


    componentDidMount() {
        this.props.respFromSearch.map(((tag, index) => {
           const Url = "http://localhost:5000/post/" + tag.id
            axios.get(Url)
                .then((res) => {

                    if (res.status === 200) {
                        this.setState({
                            postsFromSearch: this.state.postsFromSearch.concat( res.data),
                            resp: true,
                        });
                    }

                })
                .catch((err) => {
                    // console.log(err)
                    // alert("No match")
                });
        }))

    }




    render() {
        const {postsFromSearch,onSavePost,onSaveTags} = this.state
        if (true) {
            return (
                <div>
                    {this.state.resp && postsFromSearch.map(((post, index) =>
                        <Post
                            key={index}
                            onSaveTags={onSaveTags}
                             onSavePost={onSavePost}
                            post={post}
                            MyPost={this.props.MyPost}
                            title={post.title}
                            content={post.content}
                            published={post.published}
                            author={post.author}
                            imageUrl={post.imageUrl}
                            id={post.id}
                            // isLoggedIn={isLoggedIn}

                            watchs={post.watchs}
                        />))
                    }
                </div>);


        }
    }

}

