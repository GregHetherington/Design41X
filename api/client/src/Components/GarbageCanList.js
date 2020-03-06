import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import PieChart from "react-minimal-pie-chart";

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

  calculateText(percentFull) {
    if (percentFull < 0.01) {
      return "Empty";
    } else if (percentFull > 0.99) {
      return "Full";
    }
    return percentFull * 100;
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
        {garbageCans.length > 0 &&
          garbageCans.map(garbageCan => (
            <div key={garbageCan.deviceId}>
              <span style={{ fontSize: "28px" }}>{garbageCan.name}</span>
              <PieChart
                reveal={garbageCan.percentFull * 100}
                lineWidth={15}
                radius={40}
                style={{ height: "250px" }}
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
            </div>
          ))}
      </div>
    );

    return isLoading ? loading : loaded;
  }
}
