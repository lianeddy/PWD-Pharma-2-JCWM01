import React from 'react';
import Axios from 'axios';
// import {URL_API} from '../../../back_end/constants/API'


class ProductDetail extends React.Component {
    state = {
        productData: {},
        productNotFound: false,
        quantity:1,
    }

    fetchProductData = () => {
    
        Axios.get(`http://localhost:3300/product/get`, {
            params: {
                id_product: this.props.match.params.productId,
                
            }
        })
            .then((result) => {
                
                if (result.data.length) {
                    this.setState({ productData: result.data[0] })
                }
                 else {
                    this.setState({ productNotFound: true })
                }
            })
            .catch(() => {
                alert('Terjadi kesalahan di server!')
            })
    }

    componentDidMount() {
        this.fetchProductData()
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.productNotFound ?(
                        
                        <div className="alert alert-warning mt-3"> Product has not been found </div>
                    )
                : 
                <div className="row mt-3">
                    <div className="col-6">
                        <img style={{ width: "100%"}}
                        src={this.state.productData.product_image_detail}
                        alt=""/>
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center">
                            <h1>{this.state.productData.product_name}</h1>
                            {/* <h5>Rp{this.state.productData.product_price}</h5> */}
                            <p>
                                {this.state.productData.description}
                                </p>
                            <div className="d-flex flex-row align-items-center">
                                <button className="btn btn-primary mr-4">
                                    -
                                </button>
                                1
                                <button className="btn btn-primary mx-4">
                                    +
                                </button>
                        </div>
                        <button className="btn btn-info mt-3">
                            Add to Cart
                        </button>
                        </div>
                </div>
                }
                </div>
        )
    }
}

export default ProductDetail;