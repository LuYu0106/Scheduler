import React, { Component } from "react";
import { Container } from "reactstrap";
import Header from "../Layout/Header";
import MainPageHeader from "./mainPageHeader";
import Slices from "./Slices";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header />

          <Slices />
        </Container>
      </div>
    );
  }
}
