import React, { Component, useState } from 'react';
import { useEffect} from 'react'
import { Route } from 'react-router';
import CardNews from "./CardNews";

export default function MyNews({user}){

    const [articles,setArticles] = useState([]);

    useEffect(() => {
        getNews();
    },[] );

    const getNews = async () =>
    {
        const requestOptions = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }};
        const response = await fetch("https://localhost:5001/ContentCreators/getArticlesByUsername/" + user.username,requestOptions);
        const data = await response.json();
        
        console.log(data);
        setArticles(data);
    }

    return(
        <>
        <div className="news-list">
            <div className="news-list-label">MY NEWS</div>
            {articles.map(article => (
                <CardNews article={article} myNews={1}></CardNews>
            ))}
        </div>
        
        </>
    );
}