import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            username:this.props.username,
            data: [],
            id : null,
            title: null,
            content: null,
            published: null,
            author : null,
            imageUrl :null,
        };

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

    EditPublished = (e) => {
        this.setState({
            published: e.target.value,
        });
    }

    EditImageUrl = (e) => {
        this.setState({
            imageUrl: e.target.value,
        });
    }


    addPost = (e) => {
        const Url = "http://localhost:5000/newpost";
        //const Url = "/newpost";
        const data = {
            userId: this.state.userId,
            title: this.state.title,
            content: this.state.content,
            published:this.state.published,
            username:this.state.username,
            imageUrl: this.state.imageUrl
        }
        axios.post(Url, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        data: [res.data],
                    });
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                <h2>Create New Post</h2>
                <div>
                    <p>title: <input type="text" onChange={this.EditTitle} placeholder={"Enter title"} required></input><br/></p>
                    <p> content: <input type="text" onChange={this.EditContent} placeholder={"Enter post"} required></input><br/></p>
                    <p>published: <input type="text" onChange={this.EditPublished} placeholder={"Enter post"} required></input><br/></p>
                    <p>image url: <input type="text" onChange={this.EditImageUrl} placeholder="Enter Image Url" required></input><br/></p>
                </div>
                <button onClick={this.addPost}>add Post</button><br/>
            </div>
        );
    }
}