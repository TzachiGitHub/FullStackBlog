//yes
import React from 'react';
// import "../Stylies/Comments.css"
import {Link} from 'react-router-dom'
import {IconButton} from "@material-ui/core";
import {AiFillDelete, AiFillEdit} from "react-icons/all";

export default class Comment extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {

        const {isLoggedIn, username,author,comment,published,title,content,onSaveComment} = this.props
        return (
            <div className="comment">
                <h6>{author}  </h6>
                <h4>Title: {title}</h4>
                <h5>Content: {content}</h5>
                <h5>published: {published}</h5>


                {isLoggedIn && author === username &&
                    <div>
                    <IconButton>
                        <Link  onClick={(props)=> {onSaveComment(comment) }} to={(props) => '/editcomment'}>
                            <AiFillEdit/> edit
                        </Link>
                    </IconButton>

                    <IconButton >
                        <Link onClick={(props)=> {onSaveComment(comment) }}  to={(props) => '/deletecomment'}>
                            <AiFillDelete/>
                        </Link>
                    </IconButton>
                    </div>

                }
            </div>
        );
    }

}

