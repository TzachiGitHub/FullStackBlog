import React from 'react';
import axios from 'axios';
import "../Stylies/Tags.css";
import '../Stylies/NewPost.css';
import {IconButton} from "@material-ui/core";
import {AiOutlineSend,BiArrowBack} from "react-icons/all";


export default class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:null,
            resp: null,
            MyTags:this.props.MyTags,
            title: props.MyPost.title,
            author: props.MyPost.author,
            postId: this.props.MyPost.id,
            content: props.MyPost.content,
            imageUrl: props.MyPost.imageUrl,
            authorId: props.MyPost.authorId,
            userId: this.props.MyPost.userId,
            published: props.MyPost.published,
            arrayTags:(this.props.MyTags != null ) ? this.ArrayTags(this.props.MyTags) : [],
        };
    }

    back = (e) => {
        this.props.history.push("/" )
    }


    ArrayTags = (MyTags) => {
        var arr = [];
        for (let i = 0; i <MyTags.length ; i++) {
            arr.push(MyTags[i].name) ;
        }
        return arr;
    }

    EditTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    }

    EditContent = (e) => {
        this.setState({
            content: e.target.value,
        });
    }

    EditImageUrl = (e) => {
        this.setState({
            imageUrl: e.target.value,
        });
    }

    removeTag = (i) => {
        const newTags = this.state.arrayTags ;
        newTags.splice(i, 1);
        console.log("newTags ==" + newTags )
        this.setState({
            arrayTags: newTags,
        });
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.arrayTags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({
                arrayTags: [...this.state.arrayTags, val]});

            this.tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.arrayTags.length - 1);
        }


    }

    SaveEditPost = (e) => {
        const {title,content,author,imageUrl,userId,authorId,postId,arrayTags} = this.state
        const Url = "http://localhost:5000/editpost";
       // const Url = "/editpost";
        const data = {
            watchs:0,
            title: title,
            author:author,
            userId:userId,
            postId: postId,
            content:content,
            imageUrl:imageUrl,
            authorId:authorId,
            arrayTags:arrayTags,
            published:new Date().toLocaleString(),
        }


        axios.post(Url, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        post: [res.data],
                    });
                    this.props.history.push("/")
                }
            })
            .catch((err) => {
                    console.log(err)
            });
                this.props.history.push("/")
    }

    render() {
            const {title,content,imageUrl,arrayTags} = this.state

            return (
                <div>
                    <h2>Edit your Post</h2>
                    <div>
                        <p>title: <input defaultValue={title} type="text" onChange={this.EditTitle}
                                         required/><br/></p>
                        <p> content: <input defaultValue={content}  type="text" onChange={this.EditContent}
                                            required/><br/></p>
                        <p>imageUrl: <input defaultValue={imageUrl}  type="text" onChange={this.EditImageUrl}
                                             required/><br/></p>

                        <div className="input-tag">
                            <ul className="input-tag__tags">
                                { arrayTags.map((tag, i) => (
                                    <li key={i}>
                                        {tag}
                                        <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                                    </li>
                                ))}
                                <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                            </ul>
                        </div>
                    </div>

                    <IconButton onClick={this.SaveEditPost}>  <AiOutlineSend />   </IconButton>
                    <IconButton onClick={this.back} >  <BiArrowBack/>  </IconButton>
                    <br/>
                </div>
            );
        }
}