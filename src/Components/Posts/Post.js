import React from 'react';
import axios from "axios";
import "../Stylies/Tags.css"
import "../Stylies/posts.css"
import "../Stylies/PostDesign.css"
import PostDesign from "./PostDesign";


export default class Post extends React.Component{
    constructor(props) {
        super(props);

        const {onSaveTags, onSavePost, post, myPost,fromSearch, title,
               content, published, author, imageUrl, id, isLoggedIn,myTags,watchs, forhome,comments} = this.props
        this.state ={
            resp: false,
            tags: null,
            postId: id,
            post: post,
            title: title,
            myTags:myTags,
            watchs:watchs,
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
        const Url = "http://localhost:5000/tags/" + postId;
        //const Url = "/tags/" + postId
        axios.get(Url)
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

        const {tags,title,content,published,author,watchs,post,onSavePost,postId,resp,onSaveTags,forhome,comments,isLoggedIn} = this.state
         let imageUrl = this.state.imageUrl ? this.state.imageUrl : "http://picsum.photos/200/100"

        return (
            <PostDesign onSaveComment={this.props.onSaveComment}username={this.props.username} isLoggedIn={isLoggedIn} tags={tags}title={title}content={content}published={published} author={author}imageUrl={imageUrl}
                 watchs={watchs}post={post} onSavePost={onSavePost}postId={postId}resp={resp} onSaveTags={onSaveTags}forhome={forhome}comments={comments}/>
        );

    }
}

