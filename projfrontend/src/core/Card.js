import React from 'react'
import ImageHelper from './helper/ImageHelper';


const Card = ({ product,addtoCart=true, removetoCart=false}) => {


        const cartTitle=product?product.name:"A photo from pexels"   
        const cartDescription=product?product.description:"Default"    
        const cartPrice=product?product.price:"Default"
    
        const showAddToCart=(addtoCart)=>{
            return(
                addtoCart &&(
                    <button
                        onClick={() => { }}
                        className="btn btn-block btn-outline-success mt-2 mb-2">
                        Add to Cart
                    </button>
                )
            )
        }

        const showRemoveToCart=(removetoCart)=>{
            return(
                removetoCart &&(
                    <button
                        onClick={() => { }}
                        className="btn btn-block btn-outline-danger mt-2 mb-2">
                        Remove from cart
                    </button>
                )
            )
        }
        return (
            <div className="card text-white bg-dark border border-info ">
                <div className="card-header lead">{cartTitle}</div>
                <div className="card-body">
                    <ImageHelper product={product}/>
                    <p className="lead bg-success font-weight-normal text-wrap">
                        {cartDescription}
                    </p>
                    <p className="btn btn-success rounded  btn-sm px-4">${cartPrice}</p>
                    <div className="row">
                        <div className="col-12">
                            {showAddToCart(addtoCart)}
                        </div>
                        <div className="col-12">
                            {showRemoveToCart(removetoCart)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

   
export default Card;