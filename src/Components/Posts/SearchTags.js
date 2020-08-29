import React from "react";
import axios from "axios";
import Tags from "./Tags";



export default class SearchTags extends React.Component {
    constructor(props) {
        super(props);
        const {onSavePost, isLoggedIn, onSaveTags} = this.props
        this.state = {
            PostsFromSearch:null,
            respFromSearch: null,
            forSearch: this.props.match.params.word,
            onSavePost: onSavePost,
            onSaveTags:onSaveTags,
            isLoggedIn:isLoggedIn,
            resp:false,
        }
    }

    componentDidMount() {

        const {forSearch} =this.state
        const Url = "http://localhost:5000/searchtags/" + forSearch
       // const Url = "/searchtags/" + forSearch


        axios.get(Url)
            .then((res) => {
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
        const {respFromSearch,onSavePost,onSaveTags,resp} = this.state
        if (resp && respFromSearch) {

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