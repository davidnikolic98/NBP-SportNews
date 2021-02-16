import React, { Component } from 'react';
import {useEffect, useState,} from 'react';
import { Route } from 'react-router';
import { useCookies } from 'react-cookie';
import './CreateNews.css'

export default function CreateNews(){
    const [title, setTitle] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");
    const [user, setUser] = useState([]);
    const [tag, setTag] = useState("");
    const [displayTags, setDisplayTags] = useState([]);

    const [cookies, setCookie, removeCookie] = useCookies(['User']);
    const [contentCreator, setContentCreator] = useState([]);

    useEffect(() =>
    {
        
        getUser();
        setDisplayTags(tags);
    }, [tags]);

    const getUser = async () =>{
        const response = await fetch('https://localhost:5001/ContentCreators/getContentCreator/'+cookies.id);
        
        const data = await response.json();
        
        setUser(data);
        
    }
    async function addTag (){
        
        const requestOptions = {
          method: 'POST',
          headers: {  'Accept': 'application/json',
                      'Content-Type': 'application/json', },
          body: JSON.stringify({"text": tag})};
        const response = await fetch('https://localhost:5001/ContentCreators/AddTag', requestOptions);
        getTag();
        
    }

    const getTag = async () =>{
        const response = await fetch('https://localhost:5001/ContentCreators/getTag/'+tag);
        
        const data = await response.json();
        
        tags.push(data);
        console.log(tags);
        
    }

    const getCategory = async () =>{
        const response = await fetch('https://localhost:5001/ContentCreators/getCategory/'+categoryName);
        
        const data = await response.json();
        
        setCategory(data);

        writeArticle(data)
    }

    async function writeArticle (data){
        console.log(JSON.stringify({ "postedBy": user,"created": Date.now() ,"category": data, "tags": tags, "text": content, "title": title }));
        const requestOptions = {
          method: 'POST',
          headers: {  'Accept': 'application/json',
                      'Content-Type': 'application/json', },
          body: JSON.stringify({ "postedBy": user,"created": new Date(), "category": data, "tags": tags, "text": content, "title": title })};
        const response = await fetch('https://localhost:5001/ContentCreators/writeArticle', requestOptions);
        if(response.ok)
        {
            alert("Uspesno");
        }
        
    }

    
    

    const updateTitle = e => {
        setTitle(e.target.value);
    }
    const updateCategoryName = e => {
        setCategoryName(e.target.value);
    }
    const updateTag = e => {
        setTag(e.target.value);
    }
    const updateContent = e => {
        setContent(e.target.value);
    }

    return(
        <>
        <div className="div-create-news">
            <div className="news-list-label">CREATE NEWS</div>
            <p>Title: <input id="create-news-input" type="text" value={title} onChange={updateTitle}/></p>
            <p>Category: <input id="create-news-input" type="text" value={categoryName} onChange={updateCategoryName}/></p>
            <p>Tag: <input id="create-news-tag-input" type="text" value={tag} onChange={updateTag}/><button onClick={addTag} id="post-news">Add tag</button></p>
            <div className="your-tags">Your tags:</div>
            {displayTags.map(tag=>(
                <div className="your-tags">{tag.text}</div>
            ))}
            <p>Content:</p>
            <textarea type="text" id="create-news-content" value={content} onChange={updateContent}/><br/>
            <button onClick={getCategory} id="post-news">Post</button>
        </div>
        
        </>
    );
}