import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function TabbedSections() {
  return (
    <>
      <Tabs defaultActiveKey="own" id="uncontrolled-tab-example">
        <Tab eventKey="own" title="Books I own">
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventKey="read" title="Books I've Read">
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventKey="want" title="Books I want to Read">
          {/* <Sonnet /> */}
        </Tab>
      </Tabs>
    </>
  );
}
