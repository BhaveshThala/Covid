import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './Plasma.css'
import Loader from './Loader'
class Plasma extends Component {
    constructor(props) {
        super(props)

        this.setData = this.setData.bind(this)

        this.state = {
            name: '',
            phone: '',
            address: '',
            zipcode: '',
            state: 'check',
            aadhaar: '',
            district: '',
            blood: '',
            pin: [],
            result: [],
            loading: true
        }
    }

    setName(event) {
        this.setState({
            name: event.target.value
        })
    }
    setAddress(event) {
        this.setState({
            address: event.target.value
        })
    }
    setPhone(event) {
        this.setState({
            phone: event.target.value
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
            state: this.state.pin.PostOffice['0'].State,
            district: this.state.pin.PostOffice['0'].District
        })
        document.getElementById("st").value = this.state.state
        document.getElementById("ds").value = this.state.district

    }

    setAadhaar(event) {
        this.setState({
            aadhaar: event.target.value
        })
    }
    setBlood(event) {
        this.setState({
            blood: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const record = {
            Name: this.state.name,
            Contact: this.state.phone,
            Address: this.state.address,
            States: this.state.state,
            District: this.state.district,
            Aadhaar: this.state.aadhaar,
            Blood: this.state.blood,
            Zipcode: this.state.zipcode
        }
        axios.post("http://localhost:9000/plasma", record)
            .then((res) => {
            }).catch((err) => {
                console.log(err)
            })
        axios.get("http://localhost:9000/")
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

    componentDidMount() {
        axios.get("http://localhost:9000/")
            .then((res) => {
                this.setState({
                    result: res.data,
                    loading: false
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }



    render() {
        if (this.state.loading) {
            return <Loader />
        }
        return (
            <Fragment>
                <div className="container-fluid" style={{ marginTop: '95px' }}>
                    <div className="row" style={{ padding: '15px' }}>
                        <label style={{ color: 'white' }}>
                            If you are recovered from Covid-19 and want to help others by donating your plasma please.
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Click Here..
                            </button>
                        </label>
                        <label style={{ color: 'white' }}>
                            if you are a Women Donar don't fill your phone number.Use your email id instead of your number in the Phone Number Box.
                        </label>
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
                                                <label>Enter Name:</label>
                                                <input type="text" onChange={this.setName.bind(this)} className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Mode of Contact:</label>
                                                <input type="text" placeholder="Enter either Email or Phone Number" onChange={this.setPhone.bind(this)} className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Enter Address:</label>
                                                <input type="text" onChange={this.setAddress.bind(this)} className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Enter Zipcode:</label>
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
                                            <div className="form-group">
                                                <label>Enter Aadhaar Number:</label>
                                                <input type="text" style={{ textTransform: 'uppercase' }} placeholder="xxxx-xxxx-xxxx" onChange={this.setAadhaar.bind(this)} className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Enter Blood Group:</label>
                                                <input type="text" style={{ textTransform: 'uppercase' }} onChange={this.setBlood.bind(this)} className="form-control" required />
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
                </div>
                <div className="container-fluid">
                    <div className="row" style={{ padding: '15px' }}>
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover table-striped">
                                    <thead>
                                        <tr className="bg-dark" style={{ color: 'white' }}>
                                            <th scope="col">Name</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Blood Group</th>
                                            <th scope="col">Addresss</th>
                                            <th scope="col">State</th>
                                            <th scope="col">District</th>
                                            <th scope="col">Zipcode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.result.map((demo, i) =>
                                                <tr key={i + 800}>
                                                    <td key={i + 100} style={{ color: 'white' }}>{demo.Name}</td>
                                                    <td key={i + 200} style={{ color: 'white' }}>{demo.Contact}</td>
                                                    <td key={i + 300} style={{ color: 'white' }}>{demo.Blood}</td>
                                                    <td key={i + 400} style={{ color: 'white' }}>{demo.Address}</td>
                                                    <td key={i + 500} style={{ color: 'white' }}>{demo.States}</td>
                                                    <td key={i + 600} style={{ color: 'white' }}>{demo.District}</td>
                                                    <td key={i + 700} style={{ color: 'white' }}>{demo.Zipcode}</td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Plasma
