import React, {Component} from 'react';
import "../Stylies/posts.css"
import axios from 'axios';
import {Link} from 'react-router-dom'

import Comments from "../Comments/Comments";
import "../Stylies/posts.css";
import {IconButton} from "@material-ui/core";
import {
    AiFillDelete,
    AiFillEdit,
    BiArrowBack,
    AiOutlineAppstoreAdd,
    AiOutlineComment,
    AiFillFileText
} from "react-icons/all";
import VisibilityIcon from "@material-ui/icons/Visibility";






export default class SinglePost extends Component {
    constructor(props) {
        super(props);
        console.log("this.stat = " + JSON.stringify(this.props))
        const {forpopularpost,postId,username,respFromSearch,onSaveComment,isLoggedIn,onSaveTags,MyPost,userId} = this.props
        // if(!forpopularpost){
            this.state = {
                tags:null,
                watchs:null,
                resp: false,
                MyPost:MyPost ,
                userId:userId ,
                username:username,
                MyTags:this.props.MyTags,
                isLoggedIn: isLoggedIn ,
                onSaveTags:onSaveTags,
                onSaveComment:onSaveComment,
                postId:(forpopularpost)? postId : this.props.match.params.id,

            };
        // console.log("username ==" + this.props.history.params.MyTags.author)
        // console.log("username ==" + this.props.MyPost.author)

    }

    back = (e) => {
         this.props.history.push("/" )
    }





    componentDidMount () {
        const {postId,isLoggedIn,MyPost,userId,username} = this.state
        console.log(isLoggedIn)
        console.log(userId)
        console.log(this.props.username)
            if (MyPost && isLoggedIn && this.props.MyPost.authorId != userId) {
                const Url = "http://localhost:5000/post/" + postId;


                axios.post(Url)
                    .then((res) => {
                        if (res.status === 200) {

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
            if(isLoggedIn){
                const Url = "http://localhost:5000/addtowatchs/" + postId;
                const data = {
                    username:username,
                    one:1,
                    postId:postId,

                }
                axios.post(Url,data)
                    .then((res) => {
                        if (res.status === 200) {

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }



    }

    render() {


        const {resp,isLoggedIn,userId,postId,username,onSaveComment,MyComment,MyTags,MyPost,onSaveTags} = this.state
        if ( this.state && MyPost) {
            const {title, content, published, author, imageUrl, authorId, watchs} = this.state.MyPost

            return (
                <div className={"post"}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <h5>This post has been published in {published}  by {author}</h5>
                        <img src={imageUrl} alt="problem Loading Image..."/>
                        <h5> <VisibilityIcon />{watchs}</h5>


                    {MyTags && MyTags.map(((tag, index) =>

                        <th key={`${tag.name}${index}`}>
                            <div>

                                <Link
                                    onClick={(props)=> {onSaveTags(tag) }}
                                    to={(props) => `/searchtags/${tag.name}`}>
                                    <button type="button"> # {tag.name}
                                    </button>
                                </Link>
                            </div>
                        </th>))
                    }


                    {isLoggedIn && authorId == userId &&
                         <IconButton >  <Link to='/editpost'>  <AiFillEdit/> edit  </Link>     </IconButton>
                    }


                    {isLoggedIn && authorId == userId &&

                    <IconButton > <Link to='/deletepost'> <AiFillDelete/> delete </Link>   </IconButton>
                    }

                    <div className={"comment"}>
                        <Comments  MyComment={MyComment} onSaveComment={onSaveComment} username={username}  isLoggedIn={isLoggedIn} userId={userId} postId={postId}/>
                    </div>

                    <IconButton onClick={this.back} >   <BiArrowBack/>   </IconButton>
                    {isLoggedIn &&
                    <IconButton >  <Link to='/newcomment'> <AiFillEdit/> comment  </Link>     </IconButton>
                        // <AiFillFileText/>
                    }



                </div>

            );
        }else{
            return (
                <div> Loading...</div>

            )

        }
    }
}