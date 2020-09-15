import axios from 'axios';
import "../Stylies/posts.css";
import SinglePost from "./SinglePost";
import React, {Component, useEffect} from 'react';


export default class Latest extends Component {
    constructor(props) {
        super(props);
        const {MyPost,userId,isLoggedIn,username,onSaveComment,onSavePost} = this.props
        this.state = {
            tags: null,
            resp: false,
            postId: null,
            watchs: null,
            MyPost: MyPost,
            userId: userId,
            username:username,
            onSavePost:onSavePost,
            isLoggedIn:isLoggedIn,
            onSaveComment:onSaveComment,
            num:this.props.match.params.num,
        }
    }



    componentDidMount () {
        const {num,onSavePost} = this.state
        const Url = "http://localhost:5000/latest/" + Number(num)
        //const Url = "/latest/" + Number(num)
        axios.get(Url)
            .then(res => {

                if (res.status === 200) {
                    this.setState({
                        MyPost: res.data,
                        resp: true,
                        postId:res.data.id,
                    })

                }
                useEffect(() => onSavePost(res.data) );
            })
            .catch(err => {
                console.error(err);
            });
    }


    render() {
        const {MyPost,postId,onSaveComment,onSavePost,resp} = this.state
        if (resp && this.state) {
            return(
                <div>
                    <SinglePost MyPost={MyPost} savePost={onSavePost} onSaveComment={onSaveComment} forpopularpost={true} postId={postId}/>
                </div>
            );
        }else{
            return <div> Loading..</div>
        }

    }
}