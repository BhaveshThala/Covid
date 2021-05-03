import React, { Component } from 'react'
import axios from 'axios'
import './dash.css'
import Alert from './Alert'
import Loader from './Loader'
class Helpline extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: [],
            loc:[],
            number:[],
            loader:true
        }
    }
    componentDidMount() {
        axios.get("https://api.rootnet.in/covid19-in/contacts")
            .then((res) => {
                this.setState({
                    result: res.data
                })
                this.setState({
                    loc:this.state.result.data.contacts.regional.map((demo)=>demo.loc),
                    number:this.state.result.data.contacts.regional.map((demo)=>demo.number)
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
                        State Wise HelpLine Numbers.
                    </div>
                </div>
                <Alert/>
                <div className="row" style={{ padding: '15px' }}>
                    <div className="col-lg-12">
                        <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr className="bg-dark" style={{color:'white'}}>
                                    <th scope="col">S.NO</th>
                                    <th scope="col">State Name</th>
                                    <th scope="col">Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.loc.map((demo,i)=>
                                    <tr key={i+300}>
                                        <td key={i+1} style={{color:'white'}}>{i+1}</td>
                                        <td key={i+100} style={{color:'white'}}>{demo}</td>
                                        <td key={i+200} style={{color:'white'}}>{this.state.number[i]}</td>
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

export default Helpline
