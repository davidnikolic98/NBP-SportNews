import React, { Component } from 'react';
import { useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import './News.css'
import CardNews from "./CardNews";

export default function News({user}){

    const {category} = useParams();
    const [articles,setArticles] = useState([]);

    useEffect(() => {
        getNews();
    },[category] );

    const getNews = async () =>
    {
        if(category == "latest"){
            const requestOptions = {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }};
            const response = await fetch("https://localhost:5001/ContentCreators/getAllArticles",requestOptions);
            const data = await response.json();
            
            console.log(data);
            setArticles(data);
        }
        else{
            const requestOptions = {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }};
            const response = await fetch("https://localhost:5001/ContentCreators/getArticlesByCategory/" + category,requestOptions);
            const data = await response.json();
            
            console.log(data);
            setArticles(data);
        }
    }


    return(
        <>
        <div className="news-catrgories">
            <Link to="/news/Football">Football</Link>
            <Link to="/news/Formula1">Formula 1</Link>
            <Link to="/news/Tennis">Tennis</Link>
            <Link to="/news/Golf">Golf</Link>
            <Link to="/news/Basketball">Basketball</Link>
        </div>
        <div className="news-list">
            <div className="news-list-label">{category.toUpperCase()}</div>
            {articles.map(article => (
                <CardNews article={article} myNews={0}></CardNews>
            ))}
        </div>
        
        </>
    );
}