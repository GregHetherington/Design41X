import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class APITest extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    render() {
        let {apiResponse} = this.state;
        return (
        <div>
            <Button className="btn btn-info" onClick={() => this.callAPI()}>Hit API</Button>
            <p>API returns: {apiResponse}</p>
        </div>
        );
    }

}
