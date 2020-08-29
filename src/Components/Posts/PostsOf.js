import React from "react";
import axios from "axios";
import Post from "./Post";



export default class PostsOf extends React.Component {
    constructor(props) {
        super(props);
        const {onSavePost, isLoggedIn, onSaveTags,MyPost} = this.props
        this.state = {
           // MyPost:MyPost,
            author:this.props.match.params.username,
            postsofuser: null,
            byserach:false,
            onSavePost:onSavePost,
            // isLoggedIn:isLoggedIn,
            onSaveTags:onSaveTags,
            // forSearch: this.props.match.params.word,
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

            return (
                <div>
                    {postsofuser.map(((post, index) =>
                        <Post
                            key={index}
                            id={post.id}
                            onSaveTags={onSaveTags}
                            onSavePost={onSavePost}
                            post={post}
                            byserach={byserach}
                            MyPost={MyPost}
                            title={post.title}
                            author={post.author}
                            content={post.content}
                            isLoggedIn={isLoggedIn}
                            imageUrl={post.imageUrl}
                            published={post.published}

                        />))
                    }
                </div>)
        }else {
            return <p> Loading Search Component..</p>
        }
    }
}