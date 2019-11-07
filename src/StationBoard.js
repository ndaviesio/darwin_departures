import React from 'react'
import Axios from 'axios'

class StationBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            crs: this.props.crs,
            show: "trains"
        }

        this.update = this.update.bind(this)
        this.switch = this.switch.bind(this)
    }

    update() {
        Axios.get(`https://${process.env.REACT_APP_HUXLEY_PROXY_ADDRESS}/departures/${this.state.crs}/15?expand=true&accessToken=${process.env.REACT_APP_NRE_ACCESS_KEY}`)
        .then(response => {
            console.log(`Getting update from https://${process.env.REACT_APP_HUXLEY_PROXY_ADDRESS}/departures/${this.state.crs}`)
            this.setState({
                busServices: response.data.busServices != null && response.data.busServices,
                trainServices: response.data.trainServices != null && response.data.trainServices,
                locationName: response.data.locationName != null && response.data.locationName,
                nrccMessages: response.data.nrccMessages != null && response.data.nrccMessages
            })
        })
    }

    switch() {
        if(this.state.nrccMessages){
            switch(this.state.show) {
                case "trains":
                    this.setState({ show: "notices" })
                    break;
                case "notices":
                    this.setState({ show: "trains" })
                    break;
                default:
                    break;
            }
        }
    }

    componentDidMount() {
        this.update()
        // Trigger a data refresh every 10 seconds
        setInterval(this.update, 30000)
        setInterval(this.switch, 15000)
    }

    render() {
        return (
            <div className="stationBoard">
                <h2>{this.state.locationName} ({this.state.crs})</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Time</td>
                            <td>Destination</td>
                            <td className="center">Platform</td>
                            <td>Expt</td>
                        </tr>
                    </thead>
                    
                    {
                        this.state.show === "trains" ?
                            <tbody>
                                {this.state.trainServices ?
                                    this.state.trainServices.map(service => {
                                        return (
                                            <tr className="line">
                                                <td className="left">{service.std}</td>
                                                <td>{service.destination[0].locationName}</td>
                                                <td className="center">{service.etd === "Cancelled" ? "" : service.platform != null && service.platform}</td>
                                                <td className="right">{
                                                    service.etd === "Cancelled" || service.etd === "Delayed" ? 
                                                        <span className="flash">{service.etd}</span> : service.etd

                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className="line">
                                    <td colSpan="4" className="center">There are currently no trains from {this.state.locationName}</td>
                                </tr>
                                }
                            </tbody>
                        : 
                            this.state.nrccMessages &&
                                
                                <tbody>
                                    <tr className="line">
                                        <td colSpan="4" className="center"><span className="flash">PASSENGER INFORMATION</span></td>
                                    </tr>

                                    {this.state.nrccMessages.map(message => {
                                        var string = message.value.replace(/<\/?[^>]+(>|$)/g, "")
                                        var split = string.match(/.{1,50}(\s|$)/g)

                                        split.push(" ")

                                        return (
                                            split.map(line => {
                                                return (
                                                    <tr className="line">
                                                        <td colSpan="4" className="center">{line}</td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    })}
                                </tbody>
                    }
                </table>
            </div>
        )
    }
}

export default StationBoard