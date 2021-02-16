import React, { Component } from 'react';
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import './CardNews.css'

export default function CardNews({article,myNews}){

    const [cookies, setCookie, removeCookie] = useCookies(['User']);

    return(
        <>
        <div className="div-card-news">
            <div className="news-title">{article?.title}</div>
            <div><span className="created-user">{article?.postedBy?.username}</span><span className="creation-date">{article?.created}</span></div>
            <div className="news-description">{article?.text}</div>
            <div className="read-more"><Link to={`/details/${article?.title}`}>Read more...</Link>{myNews ==1 && <><button>Delete</button><Link to="/editnews"><button>Edit</button></Link></>}</div>
            
        </div>
        </>
    );
}