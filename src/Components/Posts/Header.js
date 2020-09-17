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







    render() {
        const {isLoggedIn,username,onLogout} = this.props

        return (
            <div className={"fixed-top"}>
            <div className="topnav">


                <div className="topnav-centered">
                    <Link to="/" params={{ allPosts: true }} className="active"> Home </Link>
                    {/*<a href="#home" className="active">Home</a>*/}
                </div>


                {/*<a href="#news">News</a>*/}
                <Link to="/newpost"> New Post </Link>
                {/*<a href="#contact">Contact</a>*/}
                <Link to="/aboutme"> About Me </Link>


                <div className="topnav-right">
                    {isLoggedIn &&
                    <Link to={(props) => `postsof/${username}`}>  hello {username}  </Link>
                    }
                    {isLoggedIn &&
                    <Link to="/" onClick={onLogout} > logout  </Link>
                    }
                     {/*<a href="#search">Search</a>*/}
                    {/*// <a href="#about">About</a>*/}
                    {!isLoggedIn &&
                     <Link to="/signup"> signup</Link>
                    }
                    {!isLoggedIn &&
                    <Link to="/login"> Login </Link>
                    }
                </div>

            </div>
            </div>






            // <Navbar  fixed="top" >
            //
            //         <div className="header-links">
            //
            //             <div>
            //                 <span className="header-link"> </span>
            //                 <Link to="/" params={{ allPosts: true }}> Home </Link>
            //                 <span > | </span>
            //                 <Link to="/aboutme"> About Me </Link>
            //                 <span > | </span>
            //                 <Link to="/newpost"> New Post </Link>
            //
            //
            //             </div>
            //
            //
            //             {!isLoggedIn &&
            //             <div>
            //                 <span>  |  </span>
            //                 <Link to="/signup"> signup</Link>
            //                 <span>  |  </span>
            //                 <Link to="/login"> Login </Link>
            //             </div>
            //             }
            //
            //             {isLoggedIn &&
            //             <div>
            //                 <span>  |  </span>
            //                 <Link to="/" onClick={onLogout} > logout </Link>
            //             </div>
            //             }
            //
            //             {isLoggedIn &&
            //             <div>
            //                 {/*<Label image>*/}
            //                 <span>  |  </span>
            //                     hello {username}
            //                     {/*<img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'/>*/}
            //                 {/*</Label>*/}
            //             </div>
            //
            //             }
            //
            //
            //         </div>
            //
            //     {/*</header>*/}
            // </Navbar>



        );
    }




}


















































































































































































































































































































































































































































































































































































































