import React, { Component } from 'react';
import { Route } from 'react-router';
import {
    Link,
    NavLink,
  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './Header.css'

export default function Header(){
    const [cookies, setCookie, removeCookie] = useCookies(['User']);
    return(
        <>
        <div className="header-one">
            <span id="sport">Sport</span><span id="news">News</span><span id="com">.com</span>
        </div>
        <div className="header-two">
            <Link to="/news/latest">NEWS</Link>
            {cookies.id != null ?
            <>
                {cookies.tip == "tacno" &&
                <>
                <Link to="/create">CREATE</Link>
                <Link to="/mynews">MY NEWS</Link>
                </>
                }
                <Link to="/logout">LOGOUT</Link>
            </>
            :
            <Link to="/login">LOGIN</Link>
            }
        </div>
        </>
    );
}