import React from "react";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const Home = () => {
  return <>
        <div><h3>Read Me Book Swap</h3> is a social media site for book lovers and new readers alike! Read Me provides a space for literary discussion and connecting with other readers. Write your own review or story about how a book changed your life and share it with others through our book swap feature.
Wherever you are in your reading journey, Read Me Book Swap is here to help you document, share, and explore new literary adventures.</div><br/>
        <div className="row">
          <div className="col-6">
            <Button as={Link} to="/register">register</Button>
          </div>
          <div className="col-6">
            <Button as={Link} to="/login">login</Button>
          </div>
        </div>
        
        <div>search/browse books</div>
  </>;
};

export default Home;
