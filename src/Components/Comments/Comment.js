import React from 'react';
import "../Stylies/Comments.css"
import {Link} from 'react-router-dom'

export default class Comment extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        console.log("this.props.commentId==" + this.props.commentId)
        const {isLoggedIn,author_id,userId,username,author,commentId} = this.props
        return (
            <div className="comment">
                <p> Written By: {this.props.author}</p>
                <h6>Title: {this.props.title}</h6>
                <h5>Content: {this.props.content}</h5>
                <h4>published: {this.props.published}</h4>

                {isLoggedIn && author == username &&
                    <Link
                    onClick={(props)=> {this.props.onSaveComment(this.props.comment) }}
                    to={(props) => '/deletecomment'}>
                    Delete Comment
                    </Link>


                }
            </div>


        );
    }

}

