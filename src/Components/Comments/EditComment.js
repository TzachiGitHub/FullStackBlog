import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class EditComment extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.props === ")
        console.log(this.props)
        this.state = {
            // MyPost: props.MyPost,
            id:this.props.MyComment.id,
            title: props.MyComment.title,
            content: props.MyComment.content,
            published: props.MyPost.published,
            author: props.MyComment.author,
            authorId: props.MyComment.authorId,
            postId: this.props.MyPost.id,
            userId: this.props.userId,
            resp: null
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

    SaveEditComment = (e) => {
        //const Url = "http://localhost:5000/editcomment";
        const Url = "/editcomment";
        const data = {
            id:this.state.id,
            title: this.state.title,
            content: this.state.content,
            published:new Date().toLocaleString(),
            author:this.state.author,
            authorId:this.state.userId,
            postId: this.state.postId,
        }
        console.log("this data ==================")
        console.log(data)

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
                alert("Error: failed to edit comment.")
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
                    </div>
                    <button onClick={this.SaveEditComment}>save Comment</button>
                    <br/>
                </div>
            );
        }
    }
}