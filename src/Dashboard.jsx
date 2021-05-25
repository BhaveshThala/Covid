import React, { Component } from 'react';
import axios from 'axios';
import './dash.css'
import Alert from './Alert';
import Loader from './Loader';
import c1 from './c1.jpg';
import c2 from './c2.jpg';
import c3 from './c3.jpg';
import c4 from './c4.jpg';
import c5 from './c5.jpg';
import c6 from './c6.jpg';

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
        /*axios.get("https://api.covidbedsindia.in/v1/storages/6089834e03eef33448d05a74/Haryana")
            .then((res)=>
            {
                console.log(res.data[99].HOSPITAL_INFO.split("Availability of Oxygen:")[0].split("Allocated Beds:")[1].split(", Ventilators: ")[0].split("ICU: ")[1])
            }).catch((err)=>
            {

        })*/
        axios.get("https://api.rootnet.in/covid19-in/stats/latest")
            .then((res) => {
                this.setState({
                    result: res.data,
                    loading: false
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
    travel()
    {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }
    render() {
        if (this.state.loading) {
            return <Loader />
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
                        <div className="card text-center">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img
                                    width='500'
                                    src={c1}
                                    className="img-fluid set" alt=""
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Total Cases:</h5>
                                <p className="card-text">
                                   {this.state.total}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img
                                 width='500'
                                    src={c2}
                                    className="img-fluid set" alt=""
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Confirmed Cases:</h5>
                                <p className="card-text">
                                    {this.state.confirm}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img
                                    width='500'
                                    src={c3}
                                    className="img-fluid set" alt=""
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Foreign Cases:</h5>
                                <p className="card-text">
                                    {this.state.foreign}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-sm-4 custom">
                        <div className="card text-center">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img
                                 width='500'
                                    src={c4}
                                    className="img-fluid set" alt=""
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Active Cases:</h5>
                                <p className="card-text">
                                    {this.state.active}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img
                                    width='500'
                                    height='202'
                                    src={c5}
                                    className="img-fluid set" alt=""
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Recovered Cases:</h5>
                                <p className="card-text">
                                    {this.state.recover}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 custom">
                        <div className="card text-center">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img
                                    width='500'
                                    height='202'
                                    src={c6}
                                    className="img-fluid set" alt=""
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Death Count:</h5>
                                <p className="card-text">
                                    {this.state.deaths}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div id="my">
                        <button className="feed" onClick={this.travel.bind(this)}><i className="fa fa-arrow-up"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
