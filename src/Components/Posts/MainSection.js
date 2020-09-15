import React from 'react';
import Posts from './Posts'


export default class MainSection extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {onSavePost,isLoggedIn,respfromSearch,onSaveTags,myTags,username,MyComment,onSaveComment} = this.props

        return (
            <section className="myPosts">
                <label className="title"><h1>This is my blog</h1></label>
                <div id="posts-root" className="posts-list">
                    <Posts  username={username} MyComment={MyComment}
                            myTags={myTags} respfromSearch={respfromSearch}
                            onSavePost={onSavePost} isLoggedIn={isLoggedIn}
                            onSaveComment={onSaveComment} onSaveTags={onSaveTags}
                    />

                </div>
            </section>
        );
    }
}