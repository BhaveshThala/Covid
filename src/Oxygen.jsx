import React, { Component } from 'react'
import { Fragment } from 'react'
import axios from 'axios'
import Loader from './Loader'
import './Plasma.css'
class Oxygen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pname: '',
            contact: '',
            address: '',
            zipcode: '',
            states: '',
            district: '',
            dates:'',
            pin: [],
            result: [],
            loader:true
        }
    }

    setDate(event){
        this.setState({
            dates:event.target.value
        })
    }

    setPname(event) {
        this.setState({
            pname: event.target.value
        })
    }
    setContact(event) {
        this.setState({
            contact: event.target.value
        })
    }
    setAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    async setZip(event) {
        await this.setState({
            zipcode: event.target.value
        })
        if (this.state.zipcode.length >= 6) {
            await axios.get("https://api.postalpincode.in/pincode/" + this.state.zipcode)
                .then((res) => {
                    this.setState({
                        pin: res.data[0]
                    })
                }).catch((err) => {
                    console.log(err)
                })
            this.setData()
        }
        else {

        }
    }

    async setData() {
        await this.setState({
            states: this.state.pin.PostOffice['0'].State,
            district: this.state.pin.PostOffice['0'].District
        })
        document.getElementById("st").value = this.state.states
        document.getElementById("ds").value = this.state.district

    }

    handleSubmit(event) {
        event.preventDefault()
        const record = {
            Name: this.state.pname,
            Contact: this.state.contact,
            Date:this.state.dates,
            Address: this.state.address,
            ZipCode: this.state.zipcode,
            States: this.state.states,
            District: this.state.district
        }

        axios.post("https://serveshop.xyz/oxygen", record)
            .then((res) => {
                this.setState({
                    result: res.data,
                })
                document.getElementById("dataform").reset()
                document.getElementById("close").click()
                alert("Data Stored")
            })
            .catch((err) => {
                console.log(err)
            })
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

    search() {
        document.getElementById("search").reset()
    }


    componentDidMount() {
        axios.get("https://serveshop.xyz/oxy")
            .then((res) => {
                this.setState({
                    result: res.data,
                    loader:false
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
        if(this.state.loader)
        {
            return <Loader/>
        }
        return (
            <Fragment>
                <div className="container-fluid" style={{ marginTop: '90px' }}>
                    <div className="row" style={{ padding: '15px' }}>
                        <label style={{ color: 'white' }}>
                            Please add only verified leads of Oxygen Cylinders or Oxygen Refilling.Your wrong data will lead someone
                            towards death.Don't waste people time by providing false data.
                            Always Remember <strong>HUMANITY IS THE BIGGEST RELIGION.</strong>
                        </label>
                        <label style={{ color: 'white' }}>
                            Click here to provide Oxygen Leads.
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Click Here..
                            </button>
                        </label>
                    </div>
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content cmodal">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Registration Form:</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.handleSubmit.bind(this)} id="dataform">
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Enter Person/Organization Name:</label>
                                            <input type="text" onChange={this.setPname.bind(this)} className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Contact:</label>
                                            <input type="text" onChange={this.setContact.bind(this)} placeholder="Enter either Email or Phone Number" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Verified Date:</label>
                                            <input type="date" onChange={this.setDate.bind(this)} placeholder="Enter verified date" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter Address:</label>
                                            <input type="text" onChange={this.setAddress.bind(this)} className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter Pincode:</label>
                                            <input type="text" onChange={this.setZip.bind(this)} className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter State:</label>
                                            <input type="text" id="st" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter District:</label>
                                            <input type="text" id="ds" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" id="close" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row" style={{ padding: '15px' }}>
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover table-striped">
                                    <thead>
                                        <tr className="bg-dark" style={{ color: 'white' }}>
                                            <th scope="col">Name of Person/Organization</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Verified Date</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">State</th>
                                            <th scope="col">District</th>
                                            <th scope="col">PinCode</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">
                                        {
                                            this.state.result.map((demo, i) =>
                                                <tr key={i + 100}>
                                                    <td key={i + 200} style={{ color: 'white' }}>{demo.Name}</td>
                                                    <td key={i + 300} style={{ color: 'white' }}>{demo.Contact}</td>
                                                    <td key={i + 800} style={{ color: 'white' }}>{demo.Date}</td>
                                                    <td key={i + 400} style={{ color: 'white' }}>{demo.Address}</td>
                                                    <td key={i + 500} style={{ color: 'white' }}>{demo.States}</td>
                                                    <td key={i + 600} style={{ color: 'white' }}>{demo.District}</td>
                                                    <td key={i + 700} style={{ color: 'white' }}>{demo.ZipCode}</td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
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
                                            <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
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
            </Fragment>
        )
    }
}

export default Oxygen
