import React, { Component } from 'react';
import { Route } from 'react-router';
import './CreateNews.css'

export default function EditNews(){
    return(
        <>
        <div className="div-create-news">
            <div className="news-list-label">EDIT NEWS</div>
            <p>Title: <input id="create-news-title-input" type="text"/></p>
            <p>Content:</p>
            <textarea type="text" id="create-news-content"/><br/>
            <button id="post-news">Confirm</button>
        </div>
        
        </>
    );
}