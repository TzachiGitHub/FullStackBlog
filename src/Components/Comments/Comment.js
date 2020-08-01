import React from 'react';
import "../Stylies/Comments.css"
import {Link} from 'react-router-dom'

export default class Comment extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {

        const {isLoggedIn, username,author,authorId,userId,comment,published,title,content} = this.props
        return (
            <div className="comment">
                <h4>Title: {title}</h4>
                <h5>Content: {content}</h5>
                <h6> Written By: {author}    , published: {published}</h6>


                {isLoggedIn && author == username &&
                    <Link
                    onClick={(props)=> {this.props.onSaveComment(comment) }}
                    to={(props) => '/deletecomment'}>
                    Delete Comment
                    </Link>}

                {isLoggedIn && author == username &&
                <Link
                    onClick={(props)=> {this.props.onSaveComment(comment) }}
                    to={(props) => '/editcomment'}>
                    edit Comment
                </Link>}

            </div>


        );
    }

}

