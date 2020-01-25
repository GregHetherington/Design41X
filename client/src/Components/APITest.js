import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PieChart from 'react-minimal-pie-chart';

export default class APITest extends Component {
    constructor(props) {
        super(props);
        this.state = { garbageCans: [] };
    }
    
    callAPI() {
        fetch("http://localhost:9000/database")
            .then(res => res.text())
            .then(res => this.setState({ garbageCans: JSON.parse(res) }));
    }
    
    componentWillMount() {
        this.callAPI();
    }

    render() {
        const {garbageCans} = this.state;

        return (
        <div>
            {/* <Button className="btn btn-info" onClick={() => this.callAPI()}>Hit API</Button> */}
            <p>API returns:</p>
            {garbageCans.length > 0 && garbageCans.map(garbageCan => 
                <div>
                    <p key={garbageCan._id}>Name: {garbageCan._name}</p>
                    <PieChart
                        data={[{ value: 1, key: 1, color: '#E38627' }]}
                        reveal={garbageCan._percentFull*100}
                        lineWidth={15}
                        radius={40}
                        data={[
                            {
                              color: '#E38627',
                              value: garbageCan._percentFull*100 
                            }
                          ]}
                        label
                        labelPosition={0}
                        labelStyle={{
                            fontFamily: 'sans-serif',
                            fontSize: '25px'
                        }}
                        background="#bfbfbf"
                        animate
                    />
                </div>
            )}
            
        </div>
        );
    }

}
