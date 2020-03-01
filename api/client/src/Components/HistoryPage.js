import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import PieChart from "react-minimal-pie-chart";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
var moment = require("moment");

export default class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garbageCans: [],
      historyData: [],
      isLoading: true,
      selectedDeviceId: 0
    };
  }

  fetchGarbageCanList() {
    fetch("/garbageCan")
      .then(res => res.text())
      .then(res =>
        this.setState({
          isLoading: false,
          garbageCans: JSON.parse(res),
          selectedDeviceId: JSON.parse(res)[0].deviceId
        })
      );
  }

  fetchGarbageCanHistory(selectedDeviceId) {
    fetch("/garbageCan/history?deviceId=" + selectedDeviceId)
      .then(res => res.text())
      .then(res =>
        this.setState({
          historyData: JSON.parse(res)
        })
      );
  }

  componentWillMount() {
    this.fetchGarbageCanList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { garbageCans, selectedDeviceId } = this.state;
    if (
      garbageCans.length > 0 &&
      selectedDeviceId !== prevState.selectedDeviceId
    ) {
      this.fetchGarbageCanHistory(selectedDeviceId);
    }
  }

  render() {
    const { garbageCans, isLoading, historyData } = this.state;

    const loading = (
      <div>
        <PieChart
          reveal={100}
          lineWidth={15}
          radius={40}
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
            Select Garbage Can
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {garbageCans.length > 0 &&
              garbageCans.map(garbageCan => (
                <Dropdown.Item
                  onClick={() =>
                    this.setState({ selectedDeviceId: garbageCan.deviceId })
                  }
                >
                  {garbageCan.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>

        <AreaChart
          width={380}
          height={400}
          margin={{ top: 20, right: 35, bottom: 20, left: 20 }}
          data={historyData}
        >
          <XAxis
            dataKey="updatedTime"
            scale="time"
            domain={["auto", "auto"]}
            type="number"
            tickCount={1}
            tickFormatter={tickItem => moment(tickItem).format("LT")}
          />
          <YAxis type="number" domain={[0, 1]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            labelStyle={{ color: "black" }}
            itemStyle={{ color: "black" }}
            formatter={function(value, name) {
              return `${value * 100} %`;
            }}
            labelFormatter={function(value) {
              return `Date: ${moment(value).format("llll")}`;
            }}
          />
          <Area
            type="monotone"
            dataKey="percentFull"
            stroke="#c4a043"
            dot
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25%" stopColor="#c4a043" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#c4a043" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </div>
    );

    return isLoading ? loading : loaded;
  }
}
