import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";


import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  
  
} from "react-router-dom";
import News from "./News";
import Login from "./Login";
import MainLayout from "./Layout";
import CreateNews from "./CreateNews";
import Signup from "./Signup";
import NewsDetails from "./NewsDetails";
import Logout from "./Logout";
import MyNews from "./MyNews";
import EditNews from "./EditNews";



//import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';


export default function App() {
  
  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  

  useEffect(() =>
  {
      
   
      
      
  },[]);

  return(
    <Router>
    <Switch>

      <Route path="/login">
          <Login/>
      </Route>
      <Route path="/logout">
          <Logout/>
      </Route>
      <Route path="/signup">
          <Signup/>
      </Route>

      <MainLayout>
          { user => (
            <React.Fragment>
              <Route path="/news/:category">
                  <News user={user}/>
              </Route>
              <Route path="/create">
                  <CreateNews user={user}/>
              </Route>
              <Route path="/details/:name">
                  <NewsDetails user={user}/>
              </Route>
              <Route path="/mynews">
                  <MyNews user={user}/>
              </Route>
              <Route path="/editnews/:name">
                  <EditNews user={user}/>
              </Route>
            </React.Fragment>
          )}
      </MainLayout>
    </Switch>
  </Router>
  );
/*
  return (
    <>

<div className="content">
        <Router >
          <Switch>
            <Route path="/">
            <Header />
          
          <main>
            
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              
              
              <Route path="/categories">
                <Categories />
              </Route>
              <Route path="/products/:category">
                <Products />
              </Route>
              <Route path="/detail/:productid">
                <Detail />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/buy">
                <Buy />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              
            </Switch>
          </main>
          </Route>
          
          </Switch>
        </Router>
      </div>
      <Footer />
      
    </>
  );*/
}


