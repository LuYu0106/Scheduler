import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
// on clikc does not update 。。。 something wrong with bootstrap
const GroupDetail = ({ selectedgroup }) => {
  if (!selectedgroup) {
    return <div>Please select a group</div>;
  }
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src={selectedgroup.img}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{selectedgroup.groupName}</CardTitle>
          <CardSubtitle>
            The group has {selectedgroup.numberOfGroupMenmber} and it was
            created by {selectedgroup.createBy}
          </CardSubtitle>
          <CardText>Group Description : {selectedgroup.description}</CardText>
          <Button>Join</Button>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedgroup: state.selectedGroup
  };
};

export default connect(mapStateToProps)(GroupDetail);
