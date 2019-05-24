import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

class DetailButton extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <Button
          color="link"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Check Detail
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card style={{ border: "0" }}>
            <CardBody>{this.props.taskDetails}</CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default DetailButton;
