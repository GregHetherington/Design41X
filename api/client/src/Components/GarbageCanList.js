import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import PieChart from "react-minimal-pie-chart";
import styled from "styled-components";

const GarbageCanListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GarbageCanListItem = styled.div`
  flex: 0 20%;
  margin-bottom: 2%;
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
                <span style={{ fontSize: "20px", padding: "50px" }}>
                  {garbageCan.name}
                </span>
                <img
                  src="https://img.icons8.com/ios/150/000000/waste.png"
                  style={{
                    filter: "invert(100%)"
                  }}
                ></img>
                <PieChart
                  reveal={garbageCan.percentFull * 100}
                  lineWidth={15}
                  radius={40}
                  style={{ height: "100px" }}
                  cx={50}
                  cy={50}
                  data={[
                    {
                      color: this.calculateColour(garbageCan.percentFull),
                      value: garbageCan.percentFull * 100
                    }
                  ]}
                  label
                  labelPosition={0}
                  labelStyle={{
                    fontFamily: "sans-serif",
                    fontSize: "25px"
                  }}
                  background="#bfbfbf"
                  rounded
                  animate
                />
              </GarbageCanListItem>
            ))}
        </GarbageCanListContainer>
      </div>
    );

    return isLoading ? loading : loaded;
  }
}
