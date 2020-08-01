import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class NewComment extends React.Component {
    constructor(props) {
        super(props);

        console.log("props from newcomment")
        console.log(this.props)
        this.state = {
            MyPost: this.props.MyPost,
            title: null,
            content: null,
            //author: this.props.username,
            published:null,
            authorId: this.props.MyPost.authorId,
            postId:this.props.MyPost.id,
            username:this.props.username,
            MyComment:null,
        };

        console.log("this.props.username from newcomment")
        console.log(this.props.username)
        console.log("this.props.author from newcomment")
        console.log(this.props.author)

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
        const {postId} =  this.state
        console.log("postId ==")
        console.log(postId)
        const Url = "http://localhost:5000/comment/" + postId;
        //const Url = "/comment/" + postId;
        const data = {
            title: this.state.title,
            content: this.state.content,
            username:this.state.username,
            authorId: this.state.authorId,
            postId: this.state.postId,
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
                    //this.props.history.push('/')
                      this.props.history.push('/post/'+ postId )
                }
            })
            .catch((err) => {
                this.setState({
                    data: [],
                    resp: "Error: failed to add comment."
                });
            });
                // this.props.history.push('/')
    }

    render() {
        return (

            <div>
                <h2>Add comment</h2>
                <div>
                    <p>title: <input type="text" onChange={this.EditTitle} placeholder={"Enter title"} required></input><br/></p>
                    <p> content: <input type="text" onChange={this.EditContent} placeholder="Enter post" required></input><br/></p>
                </div>
                <button onClick={this.addComment}>add Comment</button><br/>
            </div>
        );
    }
}