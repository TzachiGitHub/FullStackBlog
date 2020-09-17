import React from 'react';
import axios from "axios";
import "../Stylies/Tags.css"
import "../Stylies/posts.css"
import "../Stylies/PostDesign.css"
import PostDesign from "./PostDesign";
import {UrlPost} from"../Rejistration/Urls"


export default class Post extends React.Component{
    constructor(props) {
        super(props);

        const {onSaveTags, onSavePost, post, myPost,fromSearch, title,MyPost,
               content, published, author, imageUrl, id, isLoggedIn,myTags,watchs, forhome,comments} = this.props
        this.state ={
            resp: false,
            tags: null,
            postId: id,
            post: post,
            title: title,
            myTags:myTags,
            watchs:watchs,
            MyPost:MyPost,
            myPost: myPost,
            author: author,
            expanded:false,
            content: content,
            forhome: forhome,
            comments:comments,
            imageUrl: imageUrl,
            published: published,
            fromSearch:fromSearch,
            isLoggedIn: isLoggedIn,
            onSaveTags: onSaveTags,
            onSavePost: onSavePost,
        }

    }


    componentDidMount() {
        const {postId} = this.state
        // const UrlPost = "http://localhost:5000/tags/" + postId;
        //const UrlPost = "/tags/" + postId
        axios.get(UrlPost + postId)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        tags: res.data,
                        resp: true,
                    });

                }
            })
            .catch((err) => {
                this.setState({
                    tags: "",
                    resp: false,
                })
                console.log(err)
            });
    }


    render() {

        const {tags,title,content,published,author,watchs,post,onSavePost,postId,resp,onSaveTags,forhome,comments,isLoggedIn,MyPost} = this.state
         let imageUrl = this.state.imageUrl ? this.state.imageUrl : "http://picsum.photos/200/100"

        return (
            <div className="posts">
                <PostDesign watchs={watchs} post={post} onSavePost={onSavePost} postId={postId}
                            isLoggedIn={isLoggedIn} tags={tags} title={title} content={content}
                            onSaveComment={this.props.onSaveComment}username={this.props.username}
                            published={published} author={author} imageUrl={imageUrl} MyPost={MyPost}
                            resp={resp} onSaveTags={onSaveTags} forhome={forhome} comments={comments}
                />
            </div>
        );

    }
}

