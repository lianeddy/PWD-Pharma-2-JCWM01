import axios from 'axios';
import React from 'react';
import { URL_API } from '../../helper'
class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount() {
        axios.patch(`${URL_API}/user/verified`, {}, {
            headers: {
                'Authorization': `Bearer ${this.props.match.params.token}`
            }
        }).then(res => {
            this.setState({ message: 'Your Account Verified ✔' })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="container p-5">
                <h2>{this.state.message}</h2>
            </div>
        );
    }
}

export default VerificationPage;