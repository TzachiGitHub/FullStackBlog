import React from 'react';
import Posts from './Posts'
import Navbar from "react-bootstrap/Navbar";


export default class MainSection extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {onSavePost,isLoggedIn,respfromSearch,onSaveTags,myTags,username,MyComment,onSaveComment,MyPost} = this.props

        return (
            <section className="myPosts">
                <br/>
                <label className="title"><h1>This is my blog</h1></label>
                <div id="posts-root" className="posts-list">
                    <Posts  username={username} MyComment={MyComment}
                            myTags={myTags} respfromSearch={respfromSearch}
                            onSaveComment={onSaveComment} onSaveTags={onSaveTags}
                            onSavePost={onSavePost} isLoggedIn={isLoggedIn} MyPost={MyPost}

                    />

                </div>
            </section>
        );
    }
}