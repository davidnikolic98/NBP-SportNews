import React from "react";
import { Switch } from "react-router-dom";
import Header from "./Header";



export default function MainLayout({ children }){
    return(
        <section>
            <Header />
            <main>
                <Switch>
                {children}
                </Switch>
            </main>
            
        </section>
    );
}
