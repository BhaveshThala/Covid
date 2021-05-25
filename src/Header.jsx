import React, { Component, Fragment } from 'react'

class Header extends Component {
    render() {
        return (
            <Fragment>
                <nav style={{boxShadow: '0px 1px 10px #999'}} className="navbar navbar-expand-md navbar-dark bg-dark fixed-top justify-content-center">
                    <label className="navbar-brand" style={{color:'white',textAlign:'center'}}>Covid Statistics</label>
                </nav>
            </Fragment>
        )
    }
}

export default Header
