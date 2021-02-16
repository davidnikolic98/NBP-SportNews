import React from 'react';
import { useEffect,useState} from 'react';
import './NewsDetails.css';
import Comment from "./Comment";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams,
    
    
  } from "react-router-dom";

export default function NewsDetails({user}){

    const {name} = useParams();
    const [article,setArticle]=useState([]);

    useEffect(() => {
        getNewsDetail();
    },[] );

    const getNewsDetail = async () =>{
        const response = await fetch('https://localhost:5001/ContentCreators/getArticle/'+name);
        
        const data = await response.json();
        
        setArticle(data);
        console.log(data);
        
    }

    return(
        <>
        <div className="div-news-details">
            <div className="news-details">
                <div id="news-details-title">{article.title}</div>
                <div><span className="created-user">{article.postedBy?.name}</span><span className="creation-date">{article.created}</span></div>
                <div className="news-details-description">{article.text}</div>
                <div className="post-comment">
                    <p>Post a comment</p>
                    
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