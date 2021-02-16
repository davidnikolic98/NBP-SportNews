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
  import { useCookies } from 'react-cookie';

export default function NewsDetails(){

    const [cookies, setCookie, removeCookie] = useCookies(['User']);
    const {name} = useParams();
    const [article,setArticle]=useState([]);
    const [recommended,setRecommended] = useState([]);
    const [user,setUser] = useState([]);
    const [rec,setRec] = useState([]);
    const [comment,setComment] = useState("");
    const [comments,setComments] = useState([]);
    
    useEffect(() => {
        getNewsDetail();
        getUser();
        getRec();
    },[] );

    const getRec = async () =>
    {
        const requestOptions = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }};
        const response = await fetch("https://localhost:5001/ContentCreators/getAllArticles",requestOptions);
        const data = await response.json();
        
        setRec(data);
    }


    const getUser = async () =>
    {
        const requestOptions = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }};

        var response = null;

        if(cookies.tip == "tacno")
            response = await fetch("https://localhost:5001/ContentCreators/getContentCreator/" + cookies.id,requestOptions);
        else
            response = await fetch("https://localhost:5001/ContentCreators/getUser/" + cookies.id,requestOptions);

        const data = await response.json();
        setUser(data);

        if(cookies.tip == "netacno")
            readArticle(data);
    }

    const readArticle = async (user) =>{

        const requestOptions = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        };

        const response = await fetch('https://localhost:5001/ContentCreators/readArticle/'+name,requestOptions);
        const data = await response.json();
        
        setRecommended(data.recommended);
        //console.log(data);
       
    }


    const getNewsDetail = async () =>{

        const response = await fetch('https://localhost:5001/ContentCreators/getArticle/'+name);
        
        const data = await response.json();
        
        setArticle(data);
        getComments(data);
    }


    const postComment = async () => {
        const requestOptions = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"text": comment,"timestamp": new Date(),"user":user.id,"username":user.username,"article":article.id})
        };
        const response = await fetch("https://localhost:5001/ContentCreators/addComment",requestOptions);
        console.log(response);
    }

    const getComments = async (article) =>
    {
        const requestOptions = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article)
        };
        const response = await fetch("https://localhost:5001/ContentCreators/getAllArticleComments",requestOptions);
        const data = await response.json();
        
        console.log(data);
        setComments(data);
    }

    return(
        <>
        <div className="div-news-details">
            <div className="news-details">
                <div id="news-details-title">{article?.title}</div>
                <div><span className="created-user">{article.postedBy?.name}</span><span className="creation-date">{article.created}</span></div>
                <div className="news-details-description">{article.text}</div>
                {cookies.tip == "netacno" &&
                    <div className="post-comment">
                        <p>Post a comment</p>
                        
                        <textarea type="text" value={comment} onChange={e => setComment(e.target.value)}/><br/>
                        <button onClick={postComment}>Post</button>
                    </div>
                }
                <div className="comments">
                <p>Comments</p>
                {comments.map(comment =>(
                    <Comment username={comment.username} text={comment.text}/>
                ))}
                </div>
            </div>

            <div className="other-news">
            <div className="news-list-label">RELATED NEWS</div>
                {cookies.tip == "netacno" ?
                    <>
                        {recommended?.map(article =>(
                                <div className="related-news">
                                    <p><Link to={`/details/${article?.title}`}>{article?.title}</Link></p>
                                    <div><span className="created-user">{article?.postedBy?.username}</span><span className="creation-date">{article?.created}</span></div>
                                </div>
                        ))}
                        
                    </>
                    :
                    <>
                        {rec?.map(article => (
                             <div className="related-news">
                             <p><Link to="">{article?.title}</Link></p>
                             <div><span className="created-user">{article?.postedBy?.username}</span><span className="creation-date">{article?.created}</span></div>
                         </div>
                        ))}
                    </>
                }
            </div>
        </div>
    </>
    );
}