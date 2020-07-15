import React from 'react';
import MainSection from "../Components/MainSection";
import '../Stylies/Home.css';
import Sidebar from "../Components/Sidebar";

export default class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="home-main">
                    <div className="home-Section">
                        <MainSection savePost={this.props.savePost} isLoggedIn={this.props.isLoggedIn}/>
                    </div>
                    <div className="home-sidebar">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        );
    }
}