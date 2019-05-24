import React from "react";
import { Jumbotron, Container } from "reactstrap";

const JumbotronCreateG = props => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-5">Create a New Group</h1>
          <p className="lead">Share ideas and work together</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumbotronCreateG;
