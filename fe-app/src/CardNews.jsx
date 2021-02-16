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

    const deleteArticle = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {  'Accept': 'application/json',
                        'Content-Type': 'application/json', },
            body: JSON.stringify(article)};
        
        const response = await fetch('https://localhost:5001/ContentCreators/DeleteArticle', requestOptions);
    }

    return(
        <>
        <div className="div-card-news">
            <div className="news-title">{article?.title}</div>
            <div><span className="created-user">{article?.postedBy?.username}</span><span className="creation-date">{article?.created}</span></div>
            <div className="news-description">{article?.text}</div>
            <div className="read-more"><Link to={`/details/${article?.title}`}>Read more...</Link>{myNews ==1 && <><button onClick={deleteArticle}>Delete</button><Link to={`/editnews/${article?.title}`}><button>Edit</button></Link></>}</div>
            
        </div>
        </>
    );
}