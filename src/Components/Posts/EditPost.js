import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';
import {IconButton} from "@material-ui/core";
import "../Stylies/Tags.css";
import {AiOutlineSend,BiArrowBack,AiOutlineComment} from "react-icons/all";




export default class EditPost extends React.Component {
    constructor(props) {
        super(props);
         // console.log("this props ==" + JSON.stringify(this.props.MyTags))
        this.state = {
            title: props.MyPost.title,
            content: props.MyPost.content,
            published: props.MyPost.published,
            author: props.MyPost.author,
            imageUrl: props.MyPost.imageUrl,
            authorId: props.MyPost.authorId,
            postId: this.props.MyPost.id,
            userId: this.props.MyPost.userId,
            MyTags:this.props.MyTags,
            resp: null,
            arrayTags:(this.props.MyTags != null )?this.ArrayTags(this.props.MyTags):[],
            tags:null,

        };

    }
    back = (e) => {
        this.props.history.push("/post/" + this.state.postId)
    }


    ArrayTags = (MyTags) => {
        var arr = [];
        for (let i = 0; i <MyTags.length ; i++) {
            arr.push( MyTags[i].name) ;
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
            console.log("e==" +e)

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
            title: title,
            content:content,
            published:new Date().toLocaleString(),
            author:author,
            imageUrl:imageUrl,
            userId:userId,
            authorId:authorId,
            postId: postId,
            arrayTags:arrayTags,
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
                    alert("Error: failed to edit post.")
            });
    }

    render() {
        // if(this.state) {
        const {tags} = this.state
            const {title,content,imageUrl,MyTags,arrayTags} = this.state
       //    console.log("this.stat = " + JSON.stringify(JSON.parse(this.props.MyTags)))
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


                    {/*<div className="input-tag">*/}
                    {/*    <ul className="input-tag__tags">*/}
                    {/*        { this.props.MyTags.map((tag, i) => (*/}
                    {/*            <li key={i}>*/}
                    {/*                {tag}*/}
                    {/*                <button type="button" onClick={() => { this.removeTag(i); }}>+</button>*/}
                    {/*            </li>*/}
                    {/*        ))}*/}
                    {/*        <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}



                    <IconButton onClick={this.SaveEditPost}>  <AiOutlineSend />   </IconButton>
                    <IconButton onClick={this.back} >  <BiArrowBack/>  </IconButton>
                    <br/>
                </div>
            );
        }
    // }
}