import "../Stylies/posts.css"
import axios from 'axios';
import Post from "./Post";
import React, {Component} from 'react';
import Popup from "./Popup";

export default class Posts extends Component{
    constructor(props) {
        super(props);
        const {onSavePost,isLoggedIn,onSaveTags,myTags} =this.props
        this.state = {
            data: [],
            tags:null,
            comments:0,
            resp: false,
            forhome:false,
            myTags:myTags,
            onSavePost:onSavePost,
            isLoggedIn:isLoggedIn,
            onSaveTags:onSaveTags,





        };
    }



    componentDidMount () {
       const Url = "http://localhost:5000/posts"
        //const Url = "/posts"
        axios.get(Url)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        data: (res.data).reverse(),
                        forhome:true,
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
        const {onSavePost,onSaveTags ,data, resp, isLoggedIn,tags,myTags,forhome} = this.state;
        if (this.state && resp) {
            return (
                    <div>
                        {data.map(((post, index) =>
                            <Post
                                onSaveTags={onSaveTags}
                                key={index}
                                onSavePost={onSavePost}
                                post={post}
                                forhome={forhome}
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
                                watchs={post.watchs}
                                comments={post.comments}
                            />))
                        }







                    </div>
                )
        }else {
            return null
        }
    }
}