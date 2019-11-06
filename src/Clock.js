import React from 'react';
import moment from 'moment-timezone';

class Clock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            time: new moment.tz(this.props.timezone)
        }
    }

    componentDidMount() {
        setInterval(this.update, 1000)
    }

    update = () => {
		this.setState({
            time: new moment.tz(this.props.timezone)
		})
	}

    render() {
        const h = this.state.time.format('HH')
		const m = this.state.time.format('mm')
        const s = this.state.time.format('ss')
        
        return (
            <span>{h}:{m}:{s}</span>
        )
    }
}

export default Clock