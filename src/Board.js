import React from 'react';

import Clock from './Clock'
import StationBoard from './StationBoard'

// Import App Version
import {version} from '../package.json'

class Board extends React.Component {
    constructor() {
        super();

        let CRS = decodeURI(window.location.pathname).slice(1).toUpperCase()
        if(CRS !== ""){
            CRS = decodeURI(window.location.pathname).slice(1).toUpperCase().split(",")
        }

        this.state = {
            stations: CRS.length > 0 ? CRS : process.env.REACT_APP_STATIONS.split(','),
        }
    }

    render() {
        return (
            <div>
                <div className="board">
                    <div className="clock">
                        <Clock></Clock>
                    </div>
                    <ul>
                    {this.state.stations.map(station => {
                        return <li key={station}><StationBoard crs={station}></StationBoard></li>
                    })}
                    </ul>
                </div>
                <div className="footer">Darwin Departures Board v{version}</div>
            </div>
        )
    }
}

export default Board;