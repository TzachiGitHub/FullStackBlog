import React from "react";
import "../Stylies/Header.css";
import {Link} from "react-router-dom";
import {Label} from "semantic-ui-react";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        const {isLoggedIn,username,onLogout} = this.props
        this.state = {
            forsearch:"",
            username:username,
            onLogout:onLogout,
            isLoggedIn:isLoggedIn,
            respfromSearch: this.props.respfromSearch,
        };
    }

    handleChange = (e) => {
        this.setState({
            forsearch: e.target.value
        })
    }





    render() {
        const {isLoggedIn,username,onLogout} = this.props
        const {forsearch} = this.state
        return (



            <Navbar  fixed="top" >

                    <div className="header-links">
                        {this.AdvertisementExampleLargeLeaderboard}
                        <div>
                            <span className="header-link"> </span>
                            <Link to="/" params={{ allPosts: true }}> Home </Link>
                            <span > | </span>
                            <Link to="/aboutme"> About Me </Link>
                            <span > | </span>
                            <Link to="/newpost"> New Post </Link>

                            <input  type="text" onChange={this.handleChange} placeholder={"Enter word to search in"}/>
                            <Link to={(props) => `contentsearch/${forsearch}`}>
                                <button type="button" > contents </button>
                                <Link to={(props) => `titlesearch/${forsearch}`}>
                                    <button type="button" > titles </button>
                                </Link>
                            </Link>
                        </div>


                        {!isLoggedIn &&
                        <div>

                            <Link to="/signup"> signup</Link>
                            <span>  |  </span>
                            <Link to="/login"> Login </Link>
                        </div>
                        }

                        {isLoggedIn &&
                        <div>
                            <Link to="/" onClick={onLogout} > logout </Link>
                        </div>
                        }

                        {isLoggedIn &&
                        <div>
                            <Label image>
                                hello {username}  <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'/>
                            </Label>

                        </div>

                        }


                    </div>

                {/*</header>*/}
            </Navbar>



        );
    }




}


















































































































































































































































































































































































































































































































































































































