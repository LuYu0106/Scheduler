import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchML } from "../../actions";
import { Container, Jumbotron } from "reactstrap";
import Header from "../Layout/Header";

class recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mls: []
    };
  }
  componentWillMount() {
    this.props.fetchML();
    console.log(typeof this.state.mls);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      mls: nextProps.mls
    });
    console.log(typeof this.state.mls);
  }

  listAllClasses() {
    if (this.state.mls.length === 0) {
      return <div>More data is required!</div>;
    }
    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Course Number </th>
              <th scope="col">Course Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{this.state.mls[0][0]}</td>
              <td>{this.state.mls[0][1]}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>{this.state.mls[1][0]}</td>
              <td>{this.state.mls[1][1]}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>{this.state.mls[2][0]}</td>
              <td>{this.state.mls[2][1]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Container>
          <Header />
          <Jumbotron className="recommendationhead">
            <Container fluid>
              <h1 className="display-5">Recommendation</h1>
              <p className="lead">
                Based on your records, we recommend these courses...
              </p>
            </Container>
          </Jumbotron>
          <ul className="list-group list-group-flush list-group-horizontal-sm ">
            {this.listAllClasses()}
          </ul>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mls: state.stat.ml
  };
};

export default connect(
  mapStateToProps,
  { fetchML }
)(recommendation);
