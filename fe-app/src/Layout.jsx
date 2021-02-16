import React, { useEffect,useState } from 'react'
import { Switch } from "react-router-dom";
import Header from "./Header";

import { useCookies } from 'react-cookie';

export default function MainLayout({ children }){

    const [user,setUser] = useState([]);
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        console.log("Cao");
        getUser();
    },[] );

    const getUser = async () =>
    {
        const requestOptions = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }};
        const response = await fetch("https://localhost:5001/ContentCreators/getContentCreator/" + cookies.id,requestOptions);
        const data = await response.json();
        
        console.log(data);
        setUser(data);
    }

    return(
        <section>
            <Header />
            <main>
                <Switch>
                    {children(user)}
                </Switch>
            </main>
            
        </section>
    );
}
