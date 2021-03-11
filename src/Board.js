import React from 'react';

import Clock from './Clock'
import StationBoard from './StationBoard'

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import StationData
import stationReferenceData from './stationReferenceData'

// Import App Version
import {version} from '../package.json'

class Board extends React.Component {
    constructor() {
        super();

        /*
            Extract Station Identifiers to display
            Three options are available to users:

            1) Path based definition
                This allows users to specify a comma seperated list directly in the path of the URL (e.g. /CDF,CDQ,PAD)
            2) Query based definition
                This allows users to specify a comma seperated list as part of a query string (e.g. ?crs=CDF,CDQ,PAD)
            3) Environment based definition (Default)
                Using a .env file in the project root, users can specify a comma seperated list against REACT_APP_STATIONS
                or users can specify this in their system environment using the same name.

                When the project is built using npm run build, if the REACT_APP_STATIONS variable is within the build environment,
                the value will be compiled into the artefact.

            Order of Precendance
            1. Query Based
            2. Path Based
            3. .env file configuration
        */
        var CRS = []

        let queryCRS = window.location.search.slice(1).split('=').findIndex(item => { return item === "crs"})

        if(queryCRS >= 0){
            CRS = window.location.search.slice(1).split('=')[queryCRS + 1].split(",")
        } else {
            var pathCRS = decodeURI(window.location.pathname).slice(1).toUpperCase()
            if(pathCRS !== ""){
                CRS = pathCRS.split(",")
            }
        }

        this.state = {
            stations: CRS.length > 0 ? this.validateCRSList(CRS) : process.env.REACT_APP_STATIONS.split(','),
        }
    }

    validateCRSList = (crsList) => {
        let validList = []
        crsList.forEach(crs => {
            stationReferenceData.find(station => {
                return station.crs === crs
            }) ? validList.push(crs) : toast.dark(`${crs.toUpperCase()} is not a valid station code!`, {position: "bottom-right"})
        })
        return validList
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
                <ToastContainer
                    transition={Slide}
                />
            </div>
        )
    }
}

export default Board;
