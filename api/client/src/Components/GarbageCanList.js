import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import PieChart from "react-minimal-pie-chart";
import TweenOne from "rc-tween-one";
import SvgDrawPlugin from "rc-tween-one/lib/plugin/SvgDrawPlugin";
import styled from "styled-components";
TweenOne.plugins.push(SvgDrawPlugin);

const GarbageCanListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

//  margin-bottom: -50px;
const GarbageCanListItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  margin-right: 2%;
`;

const SORTING = {
  name: "Name",
  empty: "Empty First",
  full: "Full First"
};

export default class GarbageCanList extends Component {
  constructor(props) {
    super(props);
    this.state = { garbageCans: [], isLoading: true, sortedBy: SORTING.name };
  }

  fetchGarbageCanList() {
    fetch("/garbageCan")
      .then(res => res.text())
      .then(res =>
        this.setState({ isLoading: false, garbageCans: JSON.parse(res) })
      );
  }

  calculateColour(percentFull) {
    var hue = ((1 - percentFull) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  verifyIrbits(irbits) {
    if (irbits) {
      //verify IR sensors are not in error state
      for (let i = 0; i < 2; i++) {
        if (irbits[i] < irbits[i + 1]) {
          return false;
        }
      }
    } else {
      return true;
    }
  }

  getSensorDisplayDot(irSensorNumber, value) {
    return (
      <svg
        width="20"
        height="50"
        version="1.2"
        style={{
          display: "block",
          marginRight: "auto",
          marginLeft: "auto",
          position: "relative",
          left: "-54px",
          bottom: 156 + irSensorNumber * 84 + "px",
          visibility: value === "1" ? "visable" : "hidden"
        }}
      >
        <circle
          cx="7"
          cy="7"
          r="3"
          stroke="GoldenRod"
          fill="GoldenRod"
          stroke-width="3"
        />
      </svg>
    );
  }

  componentWillMount() {
    this.fetchGarbageCanList();
  }

  render() {
    const { garbageCans, isLoading, sortedBy } = this.state;

    garbageCans.sort(function(a, b) {
      if (sortedBy === SORTING.name) {
        return a.name.localeCompare(b.name);
      } else if (sortedBy === SORTING.empty) {
        return a.percentFull - b.percentFull;
      } else if (sortedBy === SORTING.full) {
        return b.percentFull - a.percentFull;
      }
    });

    const loading = (
      <div>
        <PieChart
          reveal={100}
          lineWidth={15}
          radius={40}
          style={{ height: "250px" }}
          data={[
            {
              color: "#FFFFFF",
              value: 100
            }
          ]}
          animationDuration={800}
          rounded
          animate
        />
      </div>
    );

    const loaded = (
      <div>
        <Dropdown style={{ textAlign: "left", padding: "15px" }}>
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            Sort By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => this.setState({ sortedBy: SORTING.name })}
            >
              {SORTING.name}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => this.setState({ sortedBy: SORTING.empty })}
            >
              {SORTING.empty}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => this.setState({ sortedBy: SORTING.full })}
            >
              {SORTING.full}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <GarbageCanListContainer class="flex-container">
          {garbageCans.length > 0 &&
            garbageCans.map(garbageCan => (
              <GarbageCanListItem key={garbageCan.deviceId}>
                <span
                  style={{
                    fontSize: "18px",
                    padding: "10px",
                    maxWidth: "200px"
                  }}
                >
                  {garbageCan.name}
                </span>
                <img
                  src="trashCanWithSensors.png"
                  width="150"
                  height="150"
                  style={{
                    filter: "invert(100%)",
                    display: "block",
                    marginRight: "auto",
                    marginLeft: "auto"
                  }}
                ></img>
                <svg
                  width="100"
                  height="104"
                  version="1.2"
                  style={{
                    display: "block",
                    marginRight: "auto",
                    marginLeft: "auto",
                    position: "relative",
                    left: "7px",
                    bottom: "113px",
                    filter: "opacity(50%)",
                    visibility:
                      this.verifyIrbits(garbageCan.irbits) === false
                        ? "hidden"
                        : "visable"
                  }}
                >
                  <TweenOne
                    animation={{
                      SVGDraw: garbageCan.percentFull * 100 + 0.01 + "%",
                      duration: 1000
                    }}
                    style={{
                      fill: "none",
                      strokeWidth: 151,
                      stroke: this.calculateColour(garbageCan.percentFull)
                    }}
                    component="path"
                    d="m 10 104 v -104"
                  />
                </svg>
                {this.getSensorDisplayDot(0, garbageCan.irbits[0])}
                {this.getSensorDisplayDot(1, garbageCan.irbits[1])}
                {this.getSensorDisplayDot(2, garbageCan.irbits[2])}
                <span
                  style={{
                    marginTop: "-240px",
                    visibility:
                      this.verifyIrbits(garbageCan.irbits) === false
                        ? "visable"
                        : "hidden"
                  }}
                  class="blinking"
                >
                  SENSOR ERROR
                </span>
              </GarbageCanListItem>
            ))}
        </GarbageCanListContainer>
      </div>
    );

    return isLoading ? loading : loaded;
  }
}
