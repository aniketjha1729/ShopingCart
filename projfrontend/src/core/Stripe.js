import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cardEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import StripeCheckOut from "react-stripe-checkout"
import { API, PUBKEY } from '../backend'
import { createOrder } from './helper/orderHelper'


const Stripe=({products,setReload=f=>f,reload=undefined}) =>{

    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })

    const token=isAuthenticated()&&isAuthenticated().authToken;
    const userId=isAuthenticated()&&isAuthenticated().user._id ;

    const getFinalPrice=()=>{
       let amount=0
       products.map(p=>{
           amount=amount+p.price
       })
       return amount;
    }
    const makePayment=(token)=>{
        const body={
          token,
          products
        }
        const headers={
          "Content-Type":"application/json"
        }
        return fetch(`${API}/stripePayment`,{
          method:"POST",
          headers,
          body:JSON.stringify(body)
        }).then(response=>{
          //console.log(response)
          const {status}=response;
          console.log("Status",status)

        }).catch(error=>console.log(error))
    }

    const showStripeButton=()=>{
        return isAuthenticated() ? (
          <StripeCheckOut
            stripeKey={PUBKEY}
            token={makePayment}
            amount={getFinalPrice() * 100}
            name="By T-Shirts"
            shippingAddress
            billingAddress
          >
            <button className="btn btn-success">Pay with Stripe</button>
          </StripeCheckOut>
        ) : (
          <Link to="/signin">
            <button className="btn btn-success">Signin</button>
          </Link>
        );
    }

    

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default Stripe