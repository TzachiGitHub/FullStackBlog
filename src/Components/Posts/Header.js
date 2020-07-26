import React from "react";
import "../Stylies/Header.css";
import {Link} from "react-router-dom";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn
        };
    }

 render() {
     return (
         <header>
             <div className="header-links">
                 <div>
                     <span className="header-link"> </span>
                     <Link to="/"> Home </Link>
                     <span className="header-link"> | </span>
                     <Link to="/aboutme"> About Me </Link>
                     <span className="header-link"> | </span>
                     <Link to="/newpost"> New Post </Link>
                 </div>

                 {!this.props.isLoggedIn &&
                    <div>
                        <Link to="/signup">signup</Link>
                         <span>  |  </span>
                         <Link to="/login">Login </Link>
                    </div>
                 }
                 {this.props.isLoggedIn &&
                    <Link to="/" onClick={this.props.onLogout} >logout </Link>
                 }
             </div>
         </header>
     );
 }


}
export default Header;





































































































































































































































































































