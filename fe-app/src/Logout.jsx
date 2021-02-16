import React, { useEffect, useState} from "react";
import { Redirect } from "react-router-dom";


import "./Login.css";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


import {useHistory} from "react-router-dom";


export default function Logout() {



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  const [nesto,setNesto]=useState(0);

  const history=useHistory();
  
  
  
 const yes = ()=>{
    removeCookie("id");
    removeCookie("type");

    
    history.push("/news");
 }
 const no = ()=>{
    

    
    history.push("/news");
 }
    

//ref();
    
    //setUser(data);
    
  
  useEffect(() =>
    {
      
      
    });


  

  
    return (
      <div className="backgroung">
        <div className="divLogout">
          
            Are you sure you want to log out?
            <br/>
            <button className="buttonInLogout" onClick={yes}>Yes</button>
            <button className="buttonInLogout" onClick={no}>No</button>
        </div>
        </div>
      );

}
