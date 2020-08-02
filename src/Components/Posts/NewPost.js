import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';
import Tags from "./Tags";
import "../Stylies/Tags.css";
import { Button } from 'semantic-ui-react';


export default class NewPost extends React.Component {
    constructor(props) {
        super(props);
       // console.log(this.props)
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
          //  tags: ['Tags', 'Input'],
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
            if (e.target.value != null){
                this.setState({
                     imageUrl: e.target.value,
                });
            }else {
                this.setState({
                    imageUrl:"//images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&h=350"
                });

            }
    }
    removeTag = (i) => {
        const newTags = [this.state.tags ];
        // console.log("this newTags from remove == " + newTags)
        newTags.splice(i, 1);
        //  console.log("this newTags from remove after splice == " + newTags)
        this.setState({
            tags: newTags,

        });
        // console.log("this newTags after the remov? ==" + this.state.tags)

    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        // console.log("val == " + val)
        //console.log("tags ==" + this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase()))
        // console.log("anser ==" +[...this.state.tags, val])
        if (e.key === 'Enter' && val) {
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({
                tags: [...this.state.tags, val]});

           // console.log("this val ==" + val)
            this.tagInput.value = null;
           // console.log("tags ==" + this.state.tags)


        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }


    }




    addPost = (tags) => {
        console.log("this is the tag", tags)
        const Url = "http://localhost:5000/newpost";
        //console.log("the tags ==" + this.state.tags)
       // console.log("e ==" + e)
        //const Url = "/newpost";
        const data = {
            userId: this.state.userId,
            title: this.state.title,
            content: this.state.content,
            // published:this.state.published,
            published: new Date().toLocaleString(),
            username:this.state.username,
            imageUrl: this.state.imageUrl,
            tags:tags,
        }
        axios.post(Url, data)
            .then((res) => {
                if (res.status === 200) {
                    console.log(data)
                    this.setState({
                        data: [res.data],
                        //tags:[this.state.tags]
                    });

                    this.props.history.push('/')
                    //console.log("the tags ==" + this.state.tags)
                }
            })
            .catch((err) => {
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
                    <p> content: <input type="text" onChange={this.EditContent} placeholder={"Enter post"} required></input><br/></p>
                    <p>image url: <input type="text" defaultValue={"https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&h=350"} onChange={this.EditImageUrl} placeholder={"Enter Image Url"} required></input><br/></p>
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

                {/*<button onClick={(tags) => {this.addPost(tags)}}>add Post</button><br/>*/}
                <button value={this.state.tags} onClick= {() => this.addPost(tags)}>add Post</button><br/>
            </div>
        );
    }
}