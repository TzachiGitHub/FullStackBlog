import React from "react";
import axios from "axios";
import Home from "./Home";
import Posts from "./Posts";
import Post from "./Post";
import Tags from "./Tags"
//import React, {Component} from 'react';

export default class SearchTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PostsFromSearch:null,
            respFromSearch: null,
            forSearch: this.props.match.params.word,
            onSavePost: this.props.onSavePost,
            onSaveTags:this.props.onSaveTags,
            isLoggedIn: this.props.isLoggedIn,
            resp:false,
        }
        // console.log("this.props from searchfrom tags")
        //
        // console.log(this.props)

    }

    componentDidMount() {


        //const Url = "http://localhost:5000/searchtags/" + this.state.forSearch
        const Url = "/searchtags/" + this.state.forSearch

        axios.get(Url)
            .then((res) => {
                console.log( "this is res.data   ")
               // console.log(res.data)
                if(res.status === 200) {
                    this.setState({
                        respFromSearch: res.data,
                        resp:true,
                    });
                }
            })
            .catch((err) => {
                console.log(err)
                alert("No match2")
            });

    }


    render() {
        const {respFromSearch,onSavePost,onSaveTags,isLoggedIn} = this.state
        if (this.state.resp &&  this.state.respFromSearch) {

            return (
                <div>
                    <Tags respFromSearch = {respFromSearch} onSavePost={onSavePost} onSaveTags={onSaveTags}
                    />

                </div>)

        }else {
            return <p> Loading Search Component..</p>
        }
    }
}