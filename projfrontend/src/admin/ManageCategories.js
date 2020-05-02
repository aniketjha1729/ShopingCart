import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { Link } from "react-router-dom";
import { isAuthenticated } from '../auth/helper';
import { getCatgories, deleteCategory } from './helper/adminapicall';

const ManageCategories=()=> {
    const [categories, setCategories] = useState([])

    const { user, authToken } = isAuthenticated();

    const preload = () => {
        getCatgories().then(data => {
            if (data.errors) {
                console.log(data.errors)
            } else {
                setCategories(data);
            }
        })
    }
    useEffect(() => {

        preload()
    }, [])
    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, authToken).then(data => {
            // if (data.errors) {
            //     console.log(data.errors)
            // } else {
                //setProducts(data)
                preload();
            
        })
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All Categories</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white mb-5">Total {categories.length} Category</h2>
                    
                    {categories.map((category, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-6">
                                    <h3 className="text-white text-left">{category.name}</h3>
                                </div>
                                
                                <div className="col-6">
                                    <button onClick={() => {
                                        deleteThisCategory(category._id);
                                    }}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>

    )
}

export default ManageCategories;