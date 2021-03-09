import React, {useState} from "react";
import Tab from "react-bootstrap/Tab";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

export default function TabbedSections() {

  const [tabShowing, setTabShowing] = useState("My Books");

  const handleClick = (tabState) => {
      setTabShowing(tabState)
  }
  

  if(tabShowing === "My Books"){

    return (
      <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="tabs" className="flex-row">
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("My Books")} eventKey="first" >My Books</Nav.Link>
                </Nav.Item>
  
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("Read")} eventKey="second">Books I've Read</Nav.Link>
                </Nav.Item>
  
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("To Read")} eventKey="third">Books To Read</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
        <div>My Books</div>
        
  
      </>
    );

  }
  else if(tabShowing === "Read"){
    return (
      <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="tabs" className="flex-row">
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("My Books")} eventKey="first" >My Books</Nav.Link>
                </Nav.Item>
  
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("Read")} eventKey="second">Books I've Read</Nav.Link>
                </Nav.Item>
  
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("To Read")} eventKey="third">Books To Read</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
        <div>Books I've Read</div>
      </>
    );
  }
  else if(tabShowing === "To Read"){
    return (
      <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="tabs" className="flex-row">
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("My Books")} eventKey="first" >My Books</Nav.Link>
                </Nav.Item>
  
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("Read")} eventKey="second">Books I've Read</Nav.Link>
                </Nav.Item>
  
                <Nav.Item>
                  <Nav.Link onClick={()=>handleClick("To Read")} eventKey="third">Books To Read</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
        <div>Books I Want to Read</div>
        
  
      </>
    );
  }

  
}
