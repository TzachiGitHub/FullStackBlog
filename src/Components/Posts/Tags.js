import React from 'react';
import axios from "axios";
import Post from "./Post";
import "../Stylies/Comments.css"
import {CardDeck} from "react-bootstrap";


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
            //const Url = "/post/" + tag.id
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
                    <CardDeck>
                    {this.state.resp && postsFromSearch.map(((post, index) =>
                        <Post
                            key={index}
                            post={post}
                            id={post.id}
                            title={post.title}
                            author={post.author}
                            watchs={post.watchs}
                            content={post.content}
                            onSaveTags={onSaveTags}
                            onSavePost={onSavePost}
                            imageUrl={post.imageUrl}
                            MyPost={this.props.MyPost}
                            published={post.published}

                        />))
                    }</CardDeck>
                </div>);


        }
    }

}

