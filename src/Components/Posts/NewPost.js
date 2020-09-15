import React from 'react';
import axios from 'axios';
import "../Stylies/Tags.css";
import '../Stylies/NewPost.css';

export default class NewPost extends React.Component {
    constructor(props) {
        super(props);
        const {userId,username,} = this.props
        this.state = {
            data: [],
            id : null,
            title: null,
            content: null,
            author : null,
            imageUrl :null,
            published: null,
            userId:userId,
            username:username,
            tags:['Enter your tag']

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


    EditImageUrl = (e) => {
                this.setState({
                     imageUrl: e.target.value,
                });


    }

    removeTag = (i) => {
        const newTags = [this.state.tags ];
        newTags.splice(i, 1);
        this.setState({
            tags: newTags,

        });


    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            console.log("e==" +e)

            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({
                tags: [...this.state.tags, val]});

            this.tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }


    }


    addPost = (tags) => {
        const {userId,title,content,username,imageUrl} =this.state
        const Url = "http://localhost:5000/newpost";
       // const Url = "/newpost";
        const data = {
            watchs:0,
            latest:0,
            tags:tags,
            comments:0,
            title: title,
            userId: userId,
            content:content,
            username:username,
            imageUrl:imageUrl,
            published: new Date().toLocaleString(),
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
                alert("Err: ")
                this.props.history.push('/')
                console.log(err)
            });
    }



    render() {
        const { tags } = this.state;

        return (
            <div>
                <h2>Create New Post</h2>
                <div>
                    <p>title: <input type="text" onChange={this.EditTitle} placeholder={"Enter title"} required></input><br/></p>
                    <p> content: <textarea type="text" onChange={this.EditContent} placeholder={"Enter post"} required></textarea><br/></p>
                    <p>image url: <input type="link" onChange={this.EditImageUrl} placeholder={"Enter Image Url"} required></input><br/></p>
                    <div className="input-tag">
                        <ul className="input-tag__tags">
                            { tags.map((tag, i) => (
                                <li key={i}>
                                    {tag}
                                    <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                                </li>
                            ))}
                            <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                        </ul>
                    </div>

                </div>

                <button value={tags} onClick= {() => this.addPost(tags)}>add Post</button><br/>
            </div>
        );
    }
}