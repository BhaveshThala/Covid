import React, { Component } from 'react'
import { Fragment } from 'react'

class Alert extends Component {
    render() {
        return (
            <Fragment>
                <div className="alert alert-info" role="alert" style={{padding:'15px'}}>
                        Data shown below is only for your information.You can trust these data ,this data is coming from offical sources.
                </div>
            </Fragment>
        )
    }
}

export default Alert
