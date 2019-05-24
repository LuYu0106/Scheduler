import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGroups } from "../../../actions";

import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
  CardBody
} from "reactstrap";

class GroupList extends Component {
  // componentWillMount() {
  //   this.props.fetchGroups();
  // }
  componentDidMount() {
    this.props.fetchGroups();
  }
  listAllGroups() {
    if (!this.props.groups) {
      return <div> loading </div>;
    }
    return this.props.groups.map(group => {
      return (
        <Col key={group.id} sm={6} md={4} className="mb-3">
          <Card>
            <CardImg
              width="338px"
              height="180px"
              src={
                group.groupPic == null
                  ? "https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  : group.groupPic
              }
              alt="Card image cap"
            />
            <div style={{ padding: 15 }}>
              <CardBody>
                <CardTitle>
                  <h4>{group.groupName}</h4>
                </CardTitle>
                <CardSubtitle>
                  <h4>
                    <Badge color="success">
                      {group.numberOfGroupMenmber} Member
                    </Badge>
                  </h4>
                </CardSubtitle>
                <CardText>Description: {group.groupDescription}</CardText>
                <Link
                  className="btn btn-outline-primary"
                  to={`/groupstask/${group.id}`}
                >
                  Join
                </Link>
              </CardBody>
            </div>
          </Card>
        </Col>
      );
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>{this.listAllGroups()}</Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: Object.values(state.groups)
  };
};

export default connect(
  mapStateToProps,
  { fetchGroups }
)(GroupList);
