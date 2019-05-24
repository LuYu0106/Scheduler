import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchTop } from "../../actions";

import { Jumbotron, Container } from "reactstrap";
import Header from "../Layout/Header";

class ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tops: []
    };
  }
  componentWillMount() {
    this.props.fetchTop();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tops: nextProps.tops
    });
  }

  listAll() {
    return (
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Number of finished tasks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                {this.state.tops[0][0]} <i class="fas fa-star" />
              </td>
              <td>{this.state.tops[0][1]}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>{this.state.tops[1][0]}</td>
              <td>{this.state.tops[1][1]}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>{this.state.tops[2][0]}</td>
              <td>{this.state.tops[2][1]}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>{this.state.tops[3][0]}</td>
              <td>{this.state.tops[3][1]}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>{this.state.tops[4][0]}</td>
              <td>{this.state.tops[4][1]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if (this.state.tops.length === 0) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <Container>
          <Header />
          <Jumbotron className="rankinghead">
            <h1 className="display-5">Ranking</h1>
            <p className="lead">
              The ones who completed the highest number of tasks...who are top
              5?
            </p>
          </Jumbotron>

          <ul className="list-group list-group-flush list-group-horizontal-sm ">
            {this.listAll()}
          </ul>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tops: state.stat.top
  };
};

export default connect(
  mapStateToProps,
  { fetchTop }
)(ranking);
