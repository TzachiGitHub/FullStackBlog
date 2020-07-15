import React from 'react';
import "../Stylies/Comments.css"
import {Link} from 'react-router-dom'

export default class Comment extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        //console.log("isLoggedIn from post " + this.props.isLoggedIn)
        return (
            <div className="comment">
                <h4>Title: {this.props.title}</h4>
                <h5>Content: {this.props.content}</h5>
                <p>Written By: {this.props.author}</p>
            </div>

        );
    }

}

