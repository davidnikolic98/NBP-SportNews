import React, { Component } from 'react';
import { Route } from 'react-router';
import './News.css'
import CardNews from "./CardNews";

export default function News(){
    return(
        <>
        <div className="news-list">
            <div className="news-list-label">LATEST NEWS</div>
            <CardNews myNews={0}/>
            <CardNews myNews={0}/>
            <CardNews myNews={0}/>
        </div>
        
        </>
    );
}