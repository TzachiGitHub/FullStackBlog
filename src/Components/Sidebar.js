//YES
import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Sidebar extends Component {
    render() {
        return (
            <aside className="home-sidebar">
                <label className="title"><h1>Latest</h1></label>
                    <ul className="side-bar-list">
                        <li> <Link to={(props) => `/latest/${1}`}  > <span>Blog post #1 </span> </Link> </li>
                        <li> <Link to={(props) => `/latest/${2}`}  > <span>Blog post #2 </span> </Link> </li>
                        <li> <Link to={(props) => `/latest/${3}`}  > <span>Blog post #3 </span></Link> </li>
                    </ul>

                <hr/>
                <label className="title"><h1>Popular</h1></label>
                    <ul className="side-bar-list">
                        <li> <Link to={(props) => `/mostpopular/${1}`}  > <span>Blog post #1 </span></Link> </li>
                        <li> <Link to={(props) => `/mostpopular/${2}`}  > <span>Blog post #2 </span> </Link> </li>
                        <li> <Link to={(props) => `/mostpopular/${3}`}  > <span>Blog post #3 </span> </Link> </li>
                    </ul>
            </aside>
        );
    }
}
