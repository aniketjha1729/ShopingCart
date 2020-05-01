import { API } from "../../backend";

export const createOrder=(userId,authToken,orderData)=>{
    return fetch(`{API}/order/cretae/${userId}`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${authToken}`
        },
        body:JSON.stringify({order:orderData})
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}