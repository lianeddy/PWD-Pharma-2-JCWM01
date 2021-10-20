import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { URL_API } from "../../helper";
import Axios from 'axios'
import { NavItem, Button } from "reactstrap";

class CustomTransaction extends React.Component{
    state = {
        dbPrescription : [],
        product : []
    }


    getData = ()=>{
        Axios.get(`${URL_API}/admin/custom-order`)
        .then((res)=>{
            this.setState({
                dbPrescription : res.data.results
            })
        })
        console.log(this.state.dbPrescription);

    }
    componentDidMount() {
        this.getData()
    }

    printData = ()=>{
        return this.state.dbPrescription.map((item, index)=>{
            return(
                <tr>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item.username}</td>
                    <td className="align-middle">{item.commentar}</td>
                </tr>

            )
        })
    }

    render (){
        return(

        <div>
            {this.printData()}
        </div>
        )
    }
}

export default CustomTransaction