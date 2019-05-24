import React, { Component } from "react";
import GroupHeader from "./GroupComponents/GroupHeader";
import GroupList from "./GroupComponents/GroupList";
import { Container } from "reactstrap";
import Header from "../Layout/Header";

export default class Group extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header />
          <GroupHeader />
          <GroupList />
          <br />
        </Container>
      </div>
    );
  }
}
