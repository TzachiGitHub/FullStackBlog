import React from 'react';
import '../Stylies/Home.css';
import Sidebar from "../Sidebar";
import MainSection from "./MainSection";


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
            const {onSavePost, isLoggedIn, onSaveTags,myTags,username,MyComment,onSaveComment} = this.props
            return (
                <div>
                    <div className="home-main">
                        <div className="home-Section">
                            <div>
                                <br/>
                            </div>
                            <MainSection username={username} MyComment={MyComment} onSaveComment={onSaveComment}onSaveTags={onSaveTags} onSavePost={onSavePost} myTags={myTags} isLoggedIn={isLoggedIn}/>
                        </div>
                        <div className="home-sidebar">
                            <Sidebar/>
                        </div>

                    </div>
                </div>
            );
        }

}