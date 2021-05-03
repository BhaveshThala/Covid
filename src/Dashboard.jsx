import React, { Component } from 'react';
import axios from 'axios';
import './dash.css'
import Alert from './Alert';
import Loader from './Loader';


class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: [],
            total: '',
            deaths: '',
            recover: '',
            foreign: '',
            confirm: '',
            active: '',
            rd: [],
            loading: true

        }
    }

    componentDidMount() {
        axios.get("https://api.rootnet.in/covid19-in/stats/latest")
            .then((res) => {
                this.setState({
                    result: res.data,
                    loading:false
                })
                this.setState({
                    total: this.state.result.data.summary.total,
                    recover: this.state.result.data.summary.discharged,
                    deaths: this.state.result.data.summary.deaths,
                    foreign: this.state.result.data.summary.confirmedCasesForeign,
                    confirm: this.state.result.data.summary.confirmedCasesIndian,
                    active: this.state.result.data.summary.total - this.state.result.data.summary.deaths - this.state.result.data.summary.discharged

                })
                this.setState({
                    rd: this.state.result.data.regional.map((demo) => demo.deaths)
                })
            })
            .catch((err) => {
              console.log(err)
        })

    }
    render() {
        if (this.state.loading) {
            return <Loader/>
        }
        return (
            <div className="container-fluid" style={{ marginTop: '95px' }}>
                <div className="card two" style={{ margin: '10px', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                        Recent Data
                    </div>
                </div>
                <Alert />
                <div className="row">
                    <div className="col-sm-4 custom">
                        <div className="card text-center anim">
                            <div className="card-header one">
                                Total Cases:
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Stay Home Stay Safe</h5>
                                <p className="card-text">{this.state.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center anim">
                            <div className="card-header two">
                                Confirm Cases:
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Stay Home Stay Safe</h5>
                                <p className="card-text">{this.state.confirm}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center anim">
                            <div className="card-header three">
                                Foreign Cases:
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Stay Home Stay Safe</h5>
                                <p className="card-text">{this.state.foreign}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-sm-4 custom">
                        <div className="card text-center anim">
                            <div className="card-header two">
                                Active Cases:
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Stay Home Stay Safe</h5>
                                <p className="card-text">{this.state.active}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center anim">
                            <div className="card-header three">
                                Recovered Cases:
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Stay Home Stay Safe</h5>
                                <p className="card-text">{this.state.recover}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center anim">
                            <div className="card-header one">
                                Deaths:
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Stay Home Stay Safe</h5>
                                <p className="card-text">{this.state.deaths}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
