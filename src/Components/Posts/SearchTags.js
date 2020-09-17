import React from "react";
import axios from "axios";
import Tags from "./Tags";
import {UrlSearchTags} from "../Rejistration/Urls"



export default class SearchTags extends React.Component {
    constructor(props) {
        super(props);
        const {onSavePost, isLoggedIn, onSaveTags} = this.props
        this.state = {
            resp:false,
            PostsFromSearch:null,
            respFromSearch: null,
            onSavePost: onSavePost,
            onSaveTags:onSaveTags,
            isLoggedIn:isLoggedIn,
            forSearch: this.props.match.params.word,

        }
    }

    componentDidMount() {

        const {forSearch} = this.state
        // const UrlSearchTags = "http://localhost:5000/searchtags/" + forSearch
       // const UrlSearchTags = "/searchtags/" + forSearch


        axios.get(UrlSearchTags + forSearch)
            .then((res) => {
                console.log("this.stat = " + JSON.stringify(res.data))
                if(res.status === 200) {
                    this.setState({
                        respFromSearch: res.data,
                        resp:true,
                    });
                }
            })
            .catch((err) => {
                console.log(err)
                alert("No match")
            });

    }


    render() {
        const {respFromSearch,onSavePost,onSaveTags,resp,isLoggedIn} = this.state

        if (resp && respFromSearch) {

            return (
                <div>
                    <br/>
                    <br/>
                    <Tags isLoggedIn={isLoggedIn} respFromSearch={respFromSearch} onSavePost={onSavePost} onSaveTags={onSaveTags}
                    />

                </div>)

        }else {
            return <p> Loading Search Component..</p>
        }
    }
}