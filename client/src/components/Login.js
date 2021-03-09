import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { saveToken } from '../redux/actions/templateActions'
import { GoogleLogin } from 'react-google-login';



const Login = () => {



  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const dispatch = useDispatch();


  // local db login
  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginUser = await axios.post('http://localhost:3005/signin', { email, password })
    dispatch(saveToken(loginUser.data.token));
  }

  // google login
  const responseGoogle = async (response) => {
    console.log(response);
    let email = response.profileObj.email;
    let firstName = response.profileObj.givenName;
    let lastName = response.profileObj.familyName;
    let loginGoogleUser = await axios.post('http://localhost:3005/googlesignin', { email, firstName, lastName })
    dispatch(saveToken(loginGoogleUser.data.token));
    console.log(loginGoogleUser.data.token);
  }

  return (
    <>

      <Container>

        <Row>

          <Col md={{ span: 4, offset: 4 }}>

            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setemail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>

            </Form>

          </Col>

        </Row>
        <Row>
          <GoogleLogin
            clientId="837075299630-6jtpjjls23ddgp155v1g0ennvcihqubm.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Row>
      </Container>

    </>
  );
};

export default Login;
