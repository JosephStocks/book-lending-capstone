import React from "react";
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BooksPhoto from './styles/images/books.jpg';
import Welcome from './components/Welcome'
import Friends from './components/Friends'
import * as S from './styles/Styles';
import { useSelector } from "react-redux";



const Home = () => {

  const token = useSelector(state => state.token);

    let whichHomePage;

    if(token === ""){
        whichHomePage = <Welcome/>
    }
    else{
        whichHomePage = <Friends/>
    }


  return <>
    {whichHomePage}
      
  </>;
};

export default Home;
