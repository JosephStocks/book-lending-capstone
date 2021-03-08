import React from "react";
import Tab from "react-bootstrap/Tab";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

export default function TabbedSections() {
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col>
            <Nav variant="tabs" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="first" >My Books</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="second">Books I've Read</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="third">Books To Read</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Tab.Container>

    </>
  );
}
