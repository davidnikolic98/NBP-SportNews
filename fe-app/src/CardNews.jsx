import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    
    
  } from "react-router-dom";
import './CardNews.css'

export default function CardNews({myNews}){
    return(
        <>
        <div className="div-card-news">
            <div className="news-title">Malaika Arora's Gym Looks Keep Getting Better, She Keeps Looking Hotter</div>
            <div><span className="created-user">Pera Peric</span><span className="creation-date">13.2.2021</span></div>
            <div className="news-description">Malaika raises temperature in a hot pink sports bra and black leggings .Malaika aces the gym look in a black sports bra and leggings .Yahoo News is better in the app .The actress looks fit in a black sports bra and matching leggings .Malaika in a Reebok sports bra and gym shorts .Yahoo News is better in the app. Malaika raises temperature in a hot pink sports bra and black leggings .Malaika aces the gym look in a black sports bra and leggings .Yahoo News is better in the app .The actress looks fit in a black sports bra and matching leggings .</div>
            <div className="read-more"><Link to="/details">Read more...</Link>{myNews ==1 && <><button>Delete</button><Link to="/editnews"><button>Edit</button></Link></>}</div>
            
        </div>
        </>
    );
}