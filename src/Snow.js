import React from 'react';

class Snow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="snow layer1 a"></div>
                <div className="snow layer1"></div> 
                <div className="snow layer2 a"></div>
                <div className="snow layer2"></div>
                <div className="snow layer3 a"></div>
                <div className="snow layer3"></div>
            </div>
        )
    }
}

export default Snow