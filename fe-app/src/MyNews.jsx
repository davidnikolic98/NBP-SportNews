import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import CardNews from "./CardNews";

export default function MyNews({user}){

    const [articles,setArticles] = useState()

    

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