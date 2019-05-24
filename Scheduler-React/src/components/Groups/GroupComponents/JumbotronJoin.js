import React from "react";
import { Jumbotron, Container } from "reactstrap";

const JumbotronJoin = props => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-5">Join a New Group</h1>
          <p className="lead">
            Get diverse personal and professional development
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumbotronJoin;
