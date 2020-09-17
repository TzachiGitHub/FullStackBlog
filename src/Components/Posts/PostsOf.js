import React from "react";
import axios from "axios";
import Post from "./Post";
import {CardDeck} from "react-bootstrap";


export default class PostsOf extends React.Component {
    constructor(props) {
        super(props);
        const {onSavePost,onSaveTags,isLoggedIn} = this.props
        this.state = {
            byserach:false,
            postsofuser: null,
            isLoggedIn:isLoggedIn,
            onSavePost:onSavePost,
            onSaveTags:onSaveTags,
            author:this.props.match.params.username,
        }

    }

    componentDidMount () {
        const {author} = this.state
        const Url = "http://localhost:5000/postsof/" + author
        // const Url = "/postsof/" +  author

        axios.get(Url)
            .then((res ) => {
                if(res.status === 200){
                    this.setState({
                        postsofuser: res.data,
                        byserach:true,
                    });
                }

            })
            .catch((err) => {
                console.log(err)
                alert("No posts")
                this.props.history.push('/')
            });
    }


    render() {
        const {postsofuser,onSavePost,isLoggedIn,onSaveTags,MyPost, byserach} = this.state

        if (this.state && postsofuser) {
            console.log("this.stat = " + JSON.stringify(this.state.postsofuser))
            return (
                <div>
                    <br/>
                    <br/>
                    <CardDeck>
                    {postsofuser.map(((post, index) =>
                        <Post
                            key={index}
                            id={post.id}
                            post={post}
                            MyPost={MyPost}
                            title={post.title}
                            byserach={byserach}
                            author={post.author}
                            watchs={post.watchs}
                            content={post.content}
                            onSaveTags={onSaveTags}
                            onSavePost={onSavePost}
                            isLoggedIn={isLoggedIn}
                            comments={post.comments}
                            imageUrl={post.imageUrl}
                            published={post.published}

                        />))
                    }</CardDeck>
                </div>)
        }else {
            return <p> Loading Search Component..</p>
        }
    }
}