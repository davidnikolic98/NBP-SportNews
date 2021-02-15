import React from 'react';

import './NewsDetails.css'
import Comment from "./Comment";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    
    
  } from "react-router-dom";

export default function NewsDetails(){
    return(
        <>
        <div className="div-news-details">
            <div className="news-details">
                <div id="news-details-title">Malaika Arora's Gym Looks Keep Getting Better, She Keeps Looking Hotter</div>
                <div><span className="created-user">Pera Peric</span><span className="creation-date">13.2.2021</span></div>
                <div className="news-details-description">Malaika raises temperature in a hot pink sports bra and black leggings .Malaika aces the gym look in a black sports bra and leggings .Yahoo News is better in the app .The actress looks fit in a black sports bra and matching leggings .Malaika in a Reebok sports bra and gym shorts .Yahoo News is better in the app. Malaika raises temperature in a hot pink sports bra and black leggings .Malaika aces the gym look in a black sports bra and leggings .Yahoo News is better in the app .The actress looks fit in a black sports bra and matching leggings .</div>
                <div className="post-comment">
                    <p>Post a comment</p>
                    <p>Nickname: <input type="text"/></p>
                    <textarea type="text"/><br/><button>Post</button>
                </div>
                <div className="comments">
                <p>Comments</p>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                </div>
            </div>
            <div className="other-news">
            <div className="news-list-label">RELATED NEWS</div>
            <div className="related-news">
                    <p><Link to="">Tokyo Olympics boss resigns over sexism row, but successor unclear</Link></p>
                    <div><span className="created-user">Pera Peric</span><span className="creation-date">13.2.2021</span></div>
                </div>
                <div className="related-news">
                    <p><Link to="">Tokyo Olympics boss resigns over sexism row, but successor unclear</Link></p>
                    <div><span className="created-user">Pera Peric</span><span className="creation-date">13.2.2021</span></div>
                </div>
                <div className="related-news">
                    <p><Link to="">Tokyo Olympics boss resigns over sexism row, but successor unclear</Link></p>
                    <div><span className="created-user">Pera Peric</span><span className="creation-date">13.2.2021</span></div>
                </div>
                <div className="related-news">
                    <p><Link to="">Tokyo Olympics boss resigns over sexism row, but successor unclear</Link></p>
                    <div><span className="created-user">Pera Peric</span><span className="creation-date">13.2.2021</span></div>
                </div>
            </div>
        </div>
        
        </>
    );
}