import React, { Component } from "react";

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div
          style={{
            padding: "25px"
          }}
        >
          <h2>About Us:</h2>
          <div>
            This project was made for ENGG*4110 at the University of Guelph
          </div>
          <div>Facality Advisor: Julie Vale, Ph.D., P.Eng</div>
          <br></br>
          <h3>Made by:</h3>
          <div>
            Noah Clark, Greg Hetherington, Bryan Kurzman, Elena Wong <br></br>
            Engineering Design IV Students, Group 22<br></br>Winter Semester
            2020
          </div>
        </div>
        <div
          style={{
            padding: "40px"
          }}
        >
          <h2>References:</h2>
          <div>
            <img
              src="trashCan.png"
              width="32"
              height="32"
              style={{
                filter: "invert(100%)"
              }}
            ></img>{" "}
            Icon made by{" "}
            <a
              href="https://www.flaticon.com/authors/smartline"
              title="Smartline"
            >
              Smartline
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}
