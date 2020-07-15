import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.props.myPost")
        console.log(this.props.myPost)
        this.state = {
            post: props.myPost,
            title: props.myPost.title,
            content: props.myPost.content,
            published: props.myPost.published,
            author: props.myPost.author,
            imageurl: props.myPost.imageurl,
            authorId: props.myPost.authorId,
            postId: this.props.myPost.id,
            userId: this.props.userId,
            resp: null
        };
        console.log("from Edit userId:")
        console.log(this.state.userId)
        console.log("from Edit authorId")
        console.log(this.state.authorId)

    }
    // componentDidMount() {
    //     this.setState({
    //         post: this.props.myPost,
    //         postId : this.props.match.params.id,
    //         title: this.props. myPost.title,
    //         content: this.props. myPost.content,
    //         published: this.props.myPost.published,
    //         author : this.props.myPost.author,
    //         imageurl :this.props.myPost.imageurl,
    //         authorId: this.props.myPost.authorId,
    //         resp: null
    //     });
    //     console.log("authorId from edit == " +this.props.myPost.authorId)
    //     console.log("From Edit.js: componentDidMount(): this.state ==")
    //     console.log(this.state)
    // }


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
            imageurl: e.target.value,
        });
    }

    EditPublished = (e) => {
        this.setState({
            published: e.target.value,
        });
    }
    EditAuthor = (e) => {
        this.setState({
            author: e.target.value,
        });
    }
    SaveEditPost = (e) => {
        const localUrl = "http://localhost:5000/edit";
        //const deployUrl = "/edit";
        // console.log(this.state.postId)
        const data = {
            title: this.state.title,
            content: this.state.content,
            published:this.state.published,
            author:this.state.author,
            imageurl: this.state.imageurl,
            userId: this.state.userId,
            authorId:this.state.authorId,
            postId: this.state.postId,
        }
        //console.log(data)
        console.log("this.state.post from edit")
        console.log(this.state.post)
        console.log(this.state.post.id)
        axios.post(localUrl, data)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.status)
                    console.log("this res from Edit")
                    console.log(res.data.author)
                    this.setState({
                        post: [res.data],
                        resp: "Success: succeed to edit post.",
                        gotPostData: true,
                    });
                    this.props.history.push("/")
                }
            })
            .catch((err) => {
                this.setState({
                    post: [],
                    resp: "Error: failed to edit post."
                });
            });
    }

    render() {
        if(this.state) {
            var {title,content,published,author,imageurl} = this.state
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
                        <p>author: <input defaultValue={author}  type="text" onChange={this.EditAuthor}
                                          required/><br/></p>
                        <p>image url: <input defaultValue={imageurl}  type="text" onChange={this.EditImageUrl}
                                             required/><br/></p>
                    </div>
                    <button onClick={this.SaveEditPost}>save Post</button>
                    <br/>
                </div>
            );
        }
    }
}