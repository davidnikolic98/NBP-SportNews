import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import './Comment.css'


export default function Comment({username,text}){

    return(
        <>
        <div className="div-comment">
            <p className="comment-nickname">{username}</p>
            <p className="comment-text">{text}</p>
        </div>
        
        </>
    );
}