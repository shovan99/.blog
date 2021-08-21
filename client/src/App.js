import React , { useEffect } from "react"
import logo from './logo.svg';
import Home from "./Components/Home"
import { Box } from "@material-ui/core"
import './App.css';
import Header from "./Components/Header"
import Detailview from "./Components/Detailview"
import Createview from "./Components/Createview"
import Updateview from "./Components/Updateview"
import { isAuthenticated } from "./Components/service/api"
import Signup from "./Components/Signup"
import About from "./Components/About"

import Contact from "./Components/Contact"

import Signin from "./Components/Signin"

import PrivateRoutes from "./Components/PrivateRoutes"

import { BrowserRouter , Route , Switch } from "react-router-dom"

function App() {
  useEffect(() => {
    isAuthenticated()
  } , [])
  return (
    <BrowserRouter>
    <Header/>
    <Switch>
    <Box style={{marginTop: 64}}>
    <Route exact path="/" component={Home}/>
    <Route exact path="/details/:id" component={Detailview}/>
    <PrivateRoutes exact path="/create" component={Createview}/>
    <PrivateRoutes exact path="/update/:id" component={Updateview}/>
    <Route exact path="/signup" component={Signup}/>
    <Route exact path="/signin" component={Signin} />
    <Route exact path="/about" component={About} />
    <Route exact path="/contact" component={Contact} />
    </Box>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
