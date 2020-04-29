import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getCatgories,getProduct,updateProduct } from './helper/adminapicall'
import { createProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'
const UpdateProduct = ({match}) => {

        const { user, authToken } = isAuthenticated();
        const [values, setValues] = useState({
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            category: "",
            categories: "",
            loading: false,
            error: "",
            createdProduct: "",
            getRedirect: "",
            formData: ""
        })

        const { name, description, price, stock, category, categories,
            loading, error, createdProduct, getRedirect, formData } = values;

        const preload = (productId) => {
            getProduct(productId).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values,
                        name:data.name,
                        description:data.description,
                        price:data.price,
                        category:data.category._id,
                        stock:data.stock,
                        formData:new FormData()
                    })
                    //console.log(categories)

                }
                console.log(data)
            })
        }

        useEffect(() => {
            preload(match.params.productId);
        }, [])

        const onSubmit = () => {
            event.preventDefault();
            setValues({ ...values, error: "", loading: true })
            updateProduct(user._id, authToken, formData).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.errors })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        stock: "",
                        loading: false,
                        createdProduct: data.name
                    })
                }

            })
        }

        const successMsg = () => {
            return (
                <div className="alert alert-success mt-3"
                    style={{ display: createdProduct ? "" : "none" }}>
                    <h4>{createdProduct} created Sussefully! </h4>
                </div>
            )
        }

        const handleChange = name => event => {
            const value = name === "photo" ? event.target.files[0] : event.target.value;
            formData.set(name, value);
            setValues({ ...values, [name]: value })
        }


        const createProductForm = () => (
            <form>
                <span>Post photo</span>
                <div className="form-group">
                    <label className="btn btn-block btn-success">
                        <input
                            onChange={handleChange("photo")}
                            type="file"
                            name="photo"
                            accept="image"
                            placeholder="choose a file"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("name")}
                        name="photo"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        onChange={handleChange("description")}
                        name="photo"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("price")}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                    />
                </div>
                <div className="form-group">
                    <select
                        onChange={handleChange("category")}
                        className="form-control"
                        placeholder="Category">
                        <option>Select</option>
                        {categories && categories.map((cate, index) => {
                            return (
                                <option key={index} value={cate._id}>
                                    {cate.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("stock")}
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        value={stock}
                    />
                </div>

                <button
                    type="submit"
                    onClick={onSubmit}
                    className="btn btn-outline-success mb-3"
                >
                    Create Product
      </button>
            </form>
        );

        return (
            <Base title="Upadte Prodcut Here!" description="Welcome to Product Create Section"
                className="container bg-info p-4">
                <Link to="/admin/dashboard" className="btn btn-md btn-dark md-3">
                    Admin Home
            </Link>
                <div className="row bg-dark text-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {successMsg()}
                        {createProductForm()}
                    </div>
                </div>

            </Base>
        )
}

export default UpdateProduct;