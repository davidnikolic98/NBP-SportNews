import React, { Component } from 'react';
import { Route } from 'react-router';
import CardNews from "./CardNews";

export default function MyNews(){
    return(
        <>
        <div className="news-list">
            <div className="news-list-label">MY NEWS</div>
            <CardNews myNews={1}/>
            <CardNews myNews={1}/>
            <CardNews myNews={1}/>
        </div>
        
        </>
    );
}