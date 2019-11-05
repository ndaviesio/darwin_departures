import React from 'react';
import Axios from 'axios';

class Board extends React.Component {
    constructor() {
        super();

        this.state = {
            access_key: process.env.REACT_APP_NRE_ACCESS_KEY,
            stations: process.env.REACT_APP_STATIONS.split(','),
            departures: []
        }
    }

    componentWillMount() {
        Axios.get(`https://${process.env.REACT_APP_HUXLEY_PROXY_ADDRESS}/departures/CDF?expand=true&accessToken=${this.state.access_key}`)
        .then(data => {
            this.setState({
                departures: data.data.trainServices
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Selected Stations</h1>
                <ul>
                    {this.state.stations.map(station => {
                        return <li>{station}</li>
                    })}
                </ul>
                <h1>Cardiff Central Departures</h1>
                <ul>
                    {this.state.departures.map((value, index) => {
                        return <li>{value.operator} service to {value.destination[0].locationName}</li>
                    })}
                </ul>
            </div>

        )
    }
}

export default Board;