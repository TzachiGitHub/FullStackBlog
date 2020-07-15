import React from 'react';
import Posts from '../Components/Posts'

export default class MainSection extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        //console.log("islogin from mainsection" + this.props.isLoggedIn)
        return (
            <section className="myPosts">
                <label className="title"><h1>This is my blog</h1></label>
                <div id="posts-root" className="posts-list">
                    <Posts savePost={this.props.savePost} isLoggedIn={this.props.isLoggedIn}/>
                </div>
            </section>
        );
    }
}