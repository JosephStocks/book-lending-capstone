import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function TabbedSections() {
  return (
    <>
      <Tabs defaultActiveKey="own" id="uncontrolled-tab-example">
        <Tab eventkey="own" title="Books I own">
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventkey="read" title="Books I've Read">
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventkey="want" title="Books I want to Read">
          {/* <Sonnet /> */}
        </Tab>
      </Tabs>
    </>
  );
}
