import React from 'react';
import "../Stylies/posts.css"
import {Link} from 'react-router-dom'
import "../Stylies/Tags.css"
import { FaReact,FaBeer} from 'react-icons/fa';
import {FiAlertOctagon} from "react-icons/fi";
import {BsStopFill,AiFillDelete} from "react-icons/all";
import {colors, IconButton} from '@material-ui/core';
import green from "@material-ui/core/colors/green";
import axios from "axios";
import Tag from "./Tag";
//import Tags from "react-native-tags-input";
export default class Post extends React.Component{
    constructor(props) {
        super(props);

        const {onSaveTags, onSavePost, post, myPost,
            title, content, published, author, imageUrl, id, isLoggedIn,myTags} = this.props
        this.state ={
            resp: false,
            onSaveTags: onSaveTags,
            onSavePost: onSavePost,
            post: post,
            myPost: myPost,
            title: title,
            content: content,
            published: published,
            author: author,
            imageUrl: imageUrl,
            postId: id,
            isLoggedIn: isLoggedIn,
            myTags:myTags,
            tags: null,
            fromSearch:this.props.fromSearch,
        }

    }


    componentDidMount() {
        const {postId, fromSearch} = this.state
        const url = "http://localhost:5000/tags/" + postId;
        // const Url = "/tags/" + postId
        axios.get(url)
            .then((res) => {
                if (res.status === 200) {
                    // console.log("this res ==" + res.data)
                    this.setState({
                        tags: res.data,
                        resp: true,
                    });
                    // console.log("the tags ==" + this.state.tags)
                    //this.getTags(this.state.id)
                }
            })
            .catch((err) => {
                this.setState({
                    tags: [],
                    resp: true,
                })
                console.log(err)
            });
    }


   render() {

        console.log("this.tags ==")
        console.log(this.state.tags)


       if (this.state && this.state.tags) {
            const {tags,resp,onSaveTags,myTags} = this.state
           return (
               <div className="post">
                   <img className="post-image" src={this.props.imageUrl} alt="next time add Url"/>
                   <h4>{this.props.title} </h4>
                   <h5>{this.props.content}</h5>
                   <h5>This post has been published {this.props.published} by {this.props.author}</h5>

                   <div>
                       {resp && tags.map(((tag, index) =>
                           <Tag
                               key={index}
                               myTags={myTags}
                               singleTag={tag}
                               onSaveTags={onSaveTags}
                               postId={tag.post_id}
                               name={tag.name}
                               id={tag.id}
                               tag={tag}

                           />))
                       }

                   </div>

                   <Link
                       onClick={(props) => {
                           this.props.onSavePost(this.props.post)
                       }}
                       to={(props) => `/post/${this.props.id}`}>
                       post
                   </Link>
                   {/*<ion-icon name="BsStopFil">kll</ion-icon>*/}
                   {/*<FaReact/>*/}
                   {/* <BsStopFill/>*/}

                   {/*<IconButton>  <AiFillDelete/>  </IconButton>*/}

               </div>

           );
       } else {
           return null
       }
   }

}

