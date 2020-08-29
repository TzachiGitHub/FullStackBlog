//no
import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';
import {IconButton} from "@material-ui/core";
import {AiFillSave, BiArrowBack} from "react-icons/all";



export default class NewComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            content: null,
            published:null,
            MyComment:null,
            MyPost: this.props.MyPost,
            postId:this.props.MyPost.id,
            username:this.props.username,
            authorId: this.props.MyPost.authorId,

        };
    }
    back = (e) => {
        this.props.history.push("/post/" + this.state.postId)
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



    addComment = (e) => {
        const {title,content,username,authorId,postId} = this.state
        const Url = "http://localhost:5000/comment/" + postId;
       // const Url = "/comment/" + postId;

        const data = {
            title:title,
            content:content,
            username:username,
            authorId:authorId,
            postId: postId,
            published: new Date().toLocaleString(),
        }
        axios.post(Url, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        data: [res.data],
                        MyComment: [res.data],
                        resp: "Success: user add comment.",
                    });
                      this.props.history.push('/post/'+ postId )
                }
            })
            .catch((err) => {
                this.setState({
                    data: [],
                    resp: "Error: failed to add comment."
                });
            });

    }

    render() {
        return (

            <div>
                <h2>Add comment</h2>
                <div>
                    <p>title: <input type="text" onChange={this.EditTitle} placeholder={"Enter title"} required></input><br/></p>
                    <p> content: <input type="text" onChange={this.EditContent} placeholder="Enter post" required></input><br/></p>
                </div>
                <IconButton onClick={this.back} >  <BiArrowBack/>  </IconButton>
                <IconButton onClick={this.addComment}  >  <AiFillSave/>   </IconButton>


            </div>
        );
    }
}