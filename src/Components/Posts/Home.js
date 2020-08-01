import React from 'react';
import MainSection from "./MainSection";
import '../Stylies/Home.css';
import Sidebar from "../Sidebar";
import axios from "axios";
import {Link} from "react-router-dom";
import Tags from "./Tags";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import {IconButton} from "@material-ui/core";
import {AiFillDelete,AiFillEdit} from "react-icons/all";

import { AiFillAlert } from "react-icons/ai";
import { Flag, Segment } from 'semantic-ui-react'



export default class Home extends React.Component{
  //  handleChange;
    constructor(props) {
        super(props);
        this.state={
            forsearch: "",
            respfromSearch: this.props.respfromSearch,
        }

        //this.handleChange = this.handleChange.bind(this);
  //      this.handleSubmit = this.handleSubmit.bind(this);
    }



     handleChange = (e) => {
        this.setState({
            forsearch: e.target.value
        })
    }


    render() {

            const {onSavePost, isLoggedIn, handleSubmit, onSaveTags,myTags} = this.props
            const {forsearch} = this.state
            return (
                <div>
                    <div className="home-main">
                        <div className="home-Section">
                            <div>


                                <br/>
                                <div>

                                    search in contents:
                                    <input  type="text" onChange={this.handleChange} placeholder={"Enter word"}/>
                                    <Link to={(props) => `search/${forsearch}`}>
                                        {/*<i aria-hidden="true" className="search circular inverted link icon"></i>*/}

                                        <button type="button" > search
                                        </button>
                                    </Link>






                                </div>
                            </div>
                            <MainSection onSaveTags={onSaveTags} onSavePost={onSavePost} myTags={myTags}
                                         isLoggedIn={isLoggedIn}/>
                        </div>

                        <div className="home-sidebar">
                            <Sidebar/>

                        </div>

                    </div>
                </div>
            );
        }

}