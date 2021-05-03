import React, { Component } from 'react'
import axios from 'axios'
import './dash.css'
import Alert from './Alert'
import Loader from './Loader'

class States extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: [],
            total:[],
            active:[],
            loc:[],
            deaths:[],
            discharge:[],
            loader:true
        }
    }
    componentDidMount() {
        axios.get("https://api.rootnet.in/covid19-in/stats/latest")
            .then((res) => {
                this.setState({
                    result: res.data
                })
                this.setState({
                    loc:this.state.result.data.regional.map((demo)=>demo.loc),
                    total:this.state.result.data.regional.map((demo)=>demo.totalConfirmed),
                    deaths:this.state.result.data.regional.map((demo)=>demo.deaths),
                    discharge:this.state.result.data.regional.map((demo)=>demo.discharged)
                })
                this.setState({
                    active:this.state.total.map((demo,i)=>demo-this.state.discharge[i]-this.state.deaths[i])
                })
                this.setState({
                    loader:false
                })
            }).catch((err) => {
                console.log(err)
            })
    }
    render() {
        if(this.state.loader)
        {
            return <Loader/>
        }
        return (
            <div className="container" style={{marginTop:'90px'}}>
                <div className="card two" style={{ margin: '10px', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)' }}>
                    <div className="card-body" style={{textAlign:'center'}}>
                        State Wise Corona Cases
                    </div>
                </div>
                <Alert/>
                <div className="row" style={{ padding: '15px' }}>
                    <div className="col-lg-12">
                        <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr className="bg-dark" style={{color:'white'}}>
                                    <th scope="col">State Name</th>
                                    <th scope="col">Confirmed Cases</th>
                                    <th scope="col">Active Cases</th>
                                    <th scope="col">Discharged</th>
                                    <th scope="col">Total Deaths</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.loc.map((demo,i)=>
                                    <tr key={i+500}>
                                        <td key={i} className="table-success">{demo}</td>
                                        <td key={i+100} className="table-info">{this.state.total[i]}</td>
                                        <td key={i+200} className="table-warning">{this.state.active[i]}</td>
                                        <td key={i+300} className="table-info">{this.state.discharge[i]}</td>
                                        <td key={i+400} className="table-danger">{this.state.deaths[i]}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default States
