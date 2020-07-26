import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class EditPost extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.props.MyPost")
        console.log(this.props.MyPost)
        this.state = {
            // MyPost: props.MyPost,
            title: props.MyPost.title,
            content: props.MyPost.content,
            published: props.MyPost.published,
            author: props.MyPost.author,
            imageUrl: props.MyPost.imageUrl,
            authorId: props.MyPost.authorId,
            postId: this.props.MyPost.id,
            userId: this.props.userId,
            resp: null
        };
        console.log("from Edit userId:")
        console.log(this.state.userId)
        console.log("from Edit authorId")
        console.log(this.state.authorId)

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

    EditPublished = (e) => {
        this.setState({
            published: e.target.value,
        });
    }

    SaveEditPost = (e) => {
        const Url = "http://localhost:5000/edit";
        //const Url = "/edit";
        const data = {
            title: this.state.title,
            content: this.state.content,
            published:this.state.published,
            author:this.state.author,
            imageUrl: this.state.imageUrl,
            userId: this.state.userId,
            authorId:this.state.authorId,
            postId: this.state.postId,
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
        if(this.state) {
            const {title,content,published,imageUrl} = this.state
            return (
                <div>
                    <h2>Edit your Post</h2>
                    <div>
                        {console.log(this.props)}
                        <p>title: <input defaultValue={title} type="text" onChange={this.EditTitle}
                                         required/><br/></p>
                        <p> content: <input defaultValue={content}  type="text" onChange={this.EditContent}
                                            required/><br/></p>
                        <p>published: <input defaultValue={published}  type="text" onChange={this.EditPublished}
                                             required/><br/></p>
                        <p>imageUrl: <input defaultValue={imageUrl}  type="text" onChange={this.EditImageUrl}
                                             required/><br/></p>
                    </div>
                    <button onClick={this.SaveEditPost}>save Post</button>
                    <br/>
                </div>
            );
        }
    }
}