import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class NewComment extends React.Component {
    constructor(props) {
        super(props);
        console.log("props from newcomment")
        console.log(this.props)
        this.state = {
            myPost: this.props.myPost,
            title: null,
            content: null,
            author: this.props.myPost.author,
            authorId: this.props.myPost.authorId,
            postId: this.props.match.params.id
        };

        console.log("this.props from newcomment")
        console.log(this.props)
        console.log("this.state from newcomment")
        console.log(this.state)

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
        const {postId} = this.state
        console.log("from addComment: this.state ==")
        console.log(this.state)
        const localUrl = "http://localhost:5000/comment/" + postId;
        //const deployUrl = "/comments/";
        const data = {
            title: this.state.title,
            content: this.state.content,
            author:this.state.author,
            authorId: this.state.authorId,
            postId: postId
        }
        axios.post(localUrl, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        data: [res.data],
                        resp: "Success: user add comment.",
                    });
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                this.setState({
                    data: [],
                    resp: "Error: failed to add post."
                });
            });
    }

    render() {
        console.log("id from newComment" + this.props.id)
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