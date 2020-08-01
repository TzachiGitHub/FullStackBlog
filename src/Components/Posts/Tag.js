import React from 'react';
import "../Stylies/Comments.css"
import {Link} from 'react-router-dom'

export default class Tag extends React.Component{
    constructor(props) {
        super(props);

    }


    render() {

        const {name,tag} = this.props
        return (
            <div className="tag">
                <Link
                    onClick={(props)=> {this.props.onSaveTags(tag) }}
                    to={(props) => `/searchtags/${name}`}>
                    <button type="button"> # {name}
                    </button>
                </Link>
            </div>


        );
    }

}

