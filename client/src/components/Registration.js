import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
// import { useDispatch, useSelector } from 'react-redux';
// import { saveToken } from '../redux/actions/baseActions'

const Registration = () => {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let registerUser = await axios.post("http://localhost:3005/register", {
      firstName: fName,
      lastName: lName,
      email,
      password,
    });
    console.log(registerUser);
    // dispatch(saveToken(loginUser.data.token));
  };
  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={fName}
                  onChange={(e) => setfName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={lName}
                  onChange={(e) => setlName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
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
      </Container>
    </>
  );
};

export default Registration;
