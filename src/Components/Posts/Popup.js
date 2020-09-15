import React from 'react';
import axios from "axios";
import "../Stylies/posts.css"

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
        return (
            <div className='popup'>
                <div className='popup\_inner'>

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