import React from "react";
import  {Component} from 'react';
import "./Stylies/PostDesign.css"
import Image from "react-bootstrap/cjs/Image";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,Menu, MenuItem,SubMenu  } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem, FaHeart} from "react-icons/all";



export default class AboutMe extends Component  {
    constructor( props ){
        super(props);
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <a target="_blank" href='https://www.facebook.com/Tzachi.Elrom'>
                    <Image className="media-aboutme" src="https://scontent.ftlv6-1.fna.fbcdn.net/v/t31.0-8/20121373_1920007211346431_8976385371433469382_o.jpg?_nc_cat=108&_nc_sid=8bfeb9&_nc_ohc=6RcoTlEeLswAX9f7dxG&_nc_ht=scontent.ftlv6-1.fna&oh=970bdae3035b6c8ab37b86ad5070d1e0&oe=5F869C42" roundedCircle />
                </a>
                <br/>
                <br/>
                <br/>
                <a target="_blank" href='https://www.facebook.com/beni.naor'>
                    <Image className="media-aboutme" src="https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/39894702_1872515986159003_8404294680853872640_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=pC9qTK_bpVgAX-WrqYm&_nc_ht=scontent.ftlv6-1.fna&oh=84ca01c1072bb69a372c2296ad427c59&oe=5F896F13" roundedCircle />
                </a>
            </div>
        );
    }
}
