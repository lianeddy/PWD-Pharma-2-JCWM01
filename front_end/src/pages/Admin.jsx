import React from 'react';
import Axios from 'axios';
// import {URL_API} from '../constants/API';


class Admin extends React.Component {

    state = {
        productList: [],
        addProductName:"",
        addDescription: "",
        addPrice: 0,
        addProductImage: "",
        addCategory: "",
        
        editId: 0,

        editProductName:"",
        editDescription: "",
        editPrice: 0,
        editProductImage: "",
        editCategory: "",
    }

    fetchProducts = () => {
        Axios.get(`http://localhost:3300/data/product`)
        .then((result) => {
        this.setState({ productList: result.data})
        })
        .catch (() => {
            alert("Terjadi kesalahan di server")
        })
    }

    editToggle = (editData) => {
        this.setState({
            editId: editData.id,
            editProductName: editData.product_name,
            editDescription: editData.description,
            editPrice: editData.product_price,
            editProductImage: editData.product_image,
            editCategory: editData.category,
        })
    }

cancelEdit = () => {
    this.setState({ editId: 0 })
}

saveBtnHandler = () => {
    Axios.patch(`http://localhost:3300/product/add-product/${this.state.editId}`,{
        product_name: this.state.editProductName,
        description: this.state.editDescription,
        product_price: parseInt(this.state.editPrice),
        product_image: this.state.editProductImage,
        category: this.state.editcategory,
    })
    .then(() => {
        this.fetchProducts()
        this.cancelEdit();
    })
    .catch(() => {
        alert("Terjadi kesalahan")
    })
}

    renderProducts = () => {
        return this.state.productList.map(val => {
            if (val.id === this.state.editId){
                return (
                    <tr>
                        <td>{val.id}</td>
                        <td> <input value={this.state.editProductName} onChange={this.inputHandler} type="text" className="form-control" name="editProductName"/> </td>
                        <td> <input value={this.state.editDescription} onChange={this.inputHandler} type="text" className="form-control" name="editDescription"/></td>
                        <td> <input value={this.state.editProductPrice} onChange={this.inputHandler} type="text" className="form-control" name="editProductPrice"/></td>
                        <td> <input value={this.state.editProductImage} onChange={this.inputHandler} type="text" className="form-control" name="editproductImage"/></td>
                        <td>
                            <select value={this.state.editCategory} onChange={this.inputHandler} name="editCategory" className="form-control">
                            <option value="">All Drugs</option>
                            <option value="liquid">Liquid</option>
                            <option value="tablet">Tablet</option>
                            </select>
                        </td>
                        <td>
                        <button onClick={this.saveBtnHandler} classsName="btn btn-success">Save</button>
                        </td>
                        <td>
                        <button onClick={this.cancelEdit} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )
            }
        return (
            <tr>
                <td>{val.id}</td>
                <td>{val.product_name}</td>
                <td>{val.description}</td>
                <td>{val.product_price}</td>
                <td><img src="{val.product_image}" alt=""/></td>
                <td>{val.category}</td>
                <td>
                <button onCLick={() => this.editToggle(val)} classsName="btn btn-secondary">Edit</button>
                </td>
                <td>
                <button className="btn btn-danger">Delete</button>
                </td>
            </tr>

            )
        })
    }


    inputHandler = (event) => {
        const {name, value} = event.target

        this.setState({ [name]: value })
    }

    addNewProduct = () => {
        Axios.post(`http://localhost:3300/product/get`, {
            product_name: this.state.addProductName,
            description: this.state.addDescription,
            product_price: parseInt(this.state.addPrice),
            product_image: this.state.addProductImage,
            category: this.state.addcategory,
            })
            .then(() => {
                this.fetchProducts()
                this.setState({
                    addproductName:"",
                    addDescription: "",
                    addPrice: 0,
                    addProductImage: "",
                    addCategory: "",
                })
            })
            .catch(() => {
                alert("Terjadi kesalahan di server")
            })
    }

    componentDidMount() {
        this.fetchProducts()
    }

render() {
return (
    <div className="p-5">
        <div className="row">
            <div className="col-12 text-center">
                <h1> Manage Products </h1>
                <table className="table mt-4">
                    <thead className="thead-light">
                    <tr>
                        <th>Id</th>
                        <th>Drugs Name</th>
                            <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                            <th>Category</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderProducts}
                            </tbody>
                            <tfoot className="bg-light">
                                <tr>
                                    <td></td>
                                    <td>
                                        <input value={this.state.addProductName} onChange={this.inputHandler} name="addProductName" type="text" classname="form-control" />
                                    </td>
                                    <td>
                                        <input value={this.state.addDescription} onChange={this.inputHandler} name="addDescription" type="text" classname="form-control" />
                                    </td>
                                    <td>
                                        <input value={this.state.addPrice} onChange={this.inputHandler} name="addPrice" type="number" classname="form-control" />
                                    </td>
                                    <td>
                                        <input value={this.state.addProductImage} onChange={this.inputHandler} name="addProductImage" type="text" classname="form-control" />
                                    </td>
                                    <td>
                                        <select onChange={this.inputHandler} name="addCategory" className="form-control">
                                            <option value="">All Drugs</option>
                                            <option value="liquid">Liquid</option>
                                            <option value="tablet">Tablet</option>
                                        </select>
                                    </td>
                                    <td colSpan="2">
                                        <button onClick={this.addNewProduct} className="btn btn-info">Add Product</button>
                                    </td>
                                    </tr>
                                    </tfoot>
                            </table>
                        </div>
                        </div>
                </div>
        )
    }
}

export default Admin