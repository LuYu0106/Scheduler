import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  getGroupChartData,
  getUserChartData
} from "../../actions/personalActions";

class TaskStatusBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      optionsPersonal: {
        title: {
          display: this.props.displayTitle,
          text: " Task statistics with different status ",
          fontSize: 25
        },
        legend: {
          display: this.props.displayLegend,
          position: this.props.legendPosition
        }
      },
      optionsGroup: {
        title: {
          display: this.props.displayTitle,
          text: " Task statistics with different status in this Group ",
          fontSize: 25
        },
        legend: {
          display: this.props.displayLegend,
          position: this.props.legendPosition
        }
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    let unfinished = nextProps.tasks.filter(
      ({ completed }) => completed === false //give userID
    ).length;
    let finished = nextProps.tasks.filter(
      ({ completed }) => completed === true //give userID
    ).length;
    let finalstat = [finished, unfinished];
    this.setState({
      chartData: {
        labels: [
          "Done",
          // "Done in Mar",
          "In Progress"
          // "In Progress in Mar"
        ],
        datasets: [
          {
            label: "Numer of tasks",
            // data: [20, 25, 10, 12],
            data: finalstat,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              // "rgba(255, 99, 132, 0.6)",
              // "rgba(54, 162, 235, 0.6)",
              "rgba(54, 162, 235, 0.6)"
              // "rgba(255, 206, 86, 0.6)",
              // "rgba(255, 206, 86, 0.6)"
              // "rgba(75, 192, 192, 0.6)",
              // "rgba(153, 102, 255, 0.6)",
              // "rgba(255, 159, 64, 0.6)",
              // "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      }
    });
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  render() {
    return (
      <div className="chart">
        {/* <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: " Task statistics with different status ",
              fontSize: 25
            }
            // legend: {
            //   display: this.props.displayLegend,
            //   position: this.props.legendPosition
            // }
          }}
        /> */}

        {/* <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Largest Cities In " + this.props.location,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        /> */}

        <Pie
          data={this.state.chartData}
          options={
            this.props.env === "group"
              ? this.state.optionsGroup
              : this.state.optionsPersonal
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};

export default connect(
  mapStateToProps,
  {
    getGroupChartData,
    getUserChartData
  }
)(TaskStatusBarChart);
