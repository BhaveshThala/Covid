import React, { Component } from 'react'
import axios from 'axios'
import './dash.css'
import Alert from './Alert'
import Loader from './Loader'
import './Plasma.css'

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

    filters() {
        var input, filter, table, tr, td, txtValue, j;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (j = 0; j < tr.length; j++) {
            td = tr[j]
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[j].style.display = "";
                } else {
                    tr[j].style.display = "none";
                }
            }
        }
    }

    search()
    {
        document.getElementById("search").reset()
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
    travel()
    {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }
    render() {
        if(this.state.loader)
        {
            return <Loader/>
        }
        return (
            <div className="container-fluid" style={{marginTop:'90px'}}>
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
                            <tbody id="myTable">
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
                <div className="container-fluid">
                    <div className="row" style={{ padding: '15px' }}>
                        <div className="modal fade" id="filter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content cmodal">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" style={{color:'white'}}>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="search">
                                            <div className="form-group">
                                                    <label>Enter any field:</label>
                                                    <input type="text" id="myInput" onKeyUp={this.filters} className="form-control" required />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" onClick={this.search.bind(this)} className="btn btn-primary">Reset</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mybutton">
                        <button className="feedback" data-toggle="modal" data-target="#filter"><i className="fa fa-search"></i></button>
                    </div>
                    <div id="my">
                        <button className="feed" onClick={this.travel.bind(this)}><i className="fa fa-arrow-up"></i></button>
                    </div>
                </div>
            </div>

        )
    }
}

export default Helpline
