import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import Posts from './Posts'
import {Label} from "semantic-ui-react";



export default class MainSection extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        var timeInMs = Date.now();
        const {onSavePost,isLoggedIn,respfromSearch,onSaveTags,myTags} = this.props

        return (
            <section className="myPosts">

                <label className="title"><h1>This is my blog</h1></label>
                <div id="posts-root" className="posts-list">
                    <Posts  onSaveTags={onSaveTags} myTags={myTags} respfromSearch={respfromSearch}  onSavePost={onSavePost} isLoggedIn={isLoggedIn}/>

                </div>
            </section>
        );
    }
}