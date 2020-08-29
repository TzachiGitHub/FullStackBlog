import React from 'react';
import "../Stylies/posts.css"
import axios from "axios";
import {Link} from "react-router-dom";
class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            resp:false,
            watchs:null,
        }
    }

    componentDidMount() {

        const Url = "http://localhost:5000/watchs/" + this.props.postId;
        //const Url = "/tags/" + postId
        axios.get(Url)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        watchs: res.data,
                        resp: true,
                    });

                }
            })
            .catch((err) => {
                this.setState({
                    // tags: [],
                    resp: false,
                })
                console.log(err)
            });
    }
    render() {
        // alert("this.stat = " + JSON.stringify(this.state.watchs))


        return (
            <div className='popup'>
                <div className='popup\_inner'>


                    <h3 style={{ color: "red" }}>In the general calculation we do not count the number of times the owner of the post watched.</h3>
                    {this.state.resp && this.state.watchs.map(((user, index) =>

                        <ul  key={`${user.name}${index}`}> <br/>
                            {(this.props.author != user.name ) &&
                                <div style={{ color: "white" }}>
                                {user.name} {user.times} times
                                </div>
                            }
                            {(this.props.author == user.name ) &&
                            <div style={{ color: "red" }}>
                                {user.name} {user.times} times
                            </div>
                            }

                        </ul>))
                    }











                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}

export default Popup;