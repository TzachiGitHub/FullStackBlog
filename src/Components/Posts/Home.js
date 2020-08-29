import React from 'react';
import MainSection from "./MainSection";
import '../Stylies/Home.css';
import Sidebar from "../Sidebar";
import {Link} from "react-router-dom";





export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            forsearch: "",
            respfromSearch: this.props.respfromSearch,
        }

    }



     handleChange = (e) => {
        this.setState({
            forsearch: e.target.value
        })
    }


    render() {

            const {onSavePost, isLoggedIn, onSaveTags,myTags} = this.props
            const {forsearch} = this.state
            return (

                <div>

                    <div className="home-main">
                        <div className="home-Section">
                            <div>
                                <br/>
                                <div>
                                    search in :
                                    <input  type="text" onChange={this.handleChange} placeholder={"Enter word to search in"}/>
                                    <Link to={(props) => `contentsearch/${forsearch}`}>
                                        <button type="button" > contents </button>
                                        <Link to={(props) => `titlesearch/${forsearch}`}>
                                            <button type="button" > titles</button>
                                        </Link>
                                    </Link> <br/>
                                </div>
                            </div>
                            <MainSection onSaveTags={onSaveTags} onSavePost={onSavePost} myTags={myTags} isLoggedIn={isLoggedIn}/>
                        </div>

                        <div className="home-sidebar">
                            <Sidebar/>
                        </div>

                    </div>
                </div>
            );
        }

}