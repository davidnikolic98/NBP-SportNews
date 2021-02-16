import React, { Component } from 'react';
import { Route } from 'react-router';
import { useCookies } from 'react-cookie';
import {useEffect, useState,} from 'react';
import {useParams} from "react-router-dom";
import './CreateNews.css'

export default function EditNews(){
    const [cookies, setCookie, removeCookie] = useCookies(['User']);
    
    const [article,setArticle]=useState([]);
    const {name} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() =>
    {
        getArticle();
    }, []);

    
    const getArticle = async () =>{
        const response = await fetch('https://localhost:5001/ContentCreators/getArticle/'+name);
        
        const data = await response.json();
        
        setArticle(data);
        console.log(data);
        
    }
    async function updateArticle (){
        //console.log(JSON.stringify({ "postedBy": user, "category": category, "tags": tags, "text": content, "title": title }));
        const requestOptions = {
          method: 'PUT',
          headers: {  'Accept': 'application/json',
                      'Content-Type': 'application/json', },
          body: JSON.stringify({ "postedBy": article.postedBy, "category": article.category, "tags": article.tags, "text": content, "title": title })};
        const response = await fetch('https://localhost:5001/ContentCreators/UpdateArticle', requestOptions);
    }

    const updateTitle = e => {
        setTitle(e.target.value);
    }
    const updateContent = e => {
        setContent(e.target.value);
    }
        
    return(
        <>
        <div className="div-create-news">
            <div className="news-list-label">EDIT NEWS</div>
            <p>Title: <input id="create-news-input" type="text" value={title} onChange={updateTitle}/></p>
            <p>Content:</p>
            <textarea type="text" id="create-news-content" value={content} onChange={updateContent}/><br/>
            <button id="post-news" onClick={updateArticle}>Confirm</button>
        </div>
        
        </>
    );
}