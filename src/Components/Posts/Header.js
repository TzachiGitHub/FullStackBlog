import React from "react";
import "../Stylies/Header.css";
import {Link} from "react-router-dom";
import {Label} from "semantic-ui-react";
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
                     <Link to="/" params={{ allPosts: true }}> Home </Link>
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

                 {this.props.isLoggedIn &&

                 <div>

                     <Label image>
                         hello {this.props.username}  <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'/>
                     </Label>
                 </div>
                 }
             </div>
         </header>
     );
 }


}
export default Header;





































































































































































































































































































