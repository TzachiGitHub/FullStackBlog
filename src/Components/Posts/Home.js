import React from 'react';
import MainSection from "../Components/MainSection";
import '../Stylies/Home.css';
import Sidebar from "../Components/Sidebar";

export default class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {onSavePost, isLoggedIn} = this.props
        return (
            <div>
                <div className="home-main">
                    <div className="home-Section">
                        <MainSection onSavePost={onSavePost} isLoggedIn={isLoggedIn}/>
                    </div>
                    <div className="home-sidebar">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        );
    }
}