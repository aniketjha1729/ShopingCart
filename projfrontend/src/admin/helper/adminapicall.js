import { API } from "../../backend";

export const createCategory = (userId, authToken, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCatgories=()=>{
    return fetch(`${API}/categories`,{
        method: "GET", 
    }).then(response=>{
       return response.json();
    }).catch(err=>{
        return console.log(err)
    })
}

export const deleteCategory=(categoryId,userId,authToken)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`
        }
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
}


export const createProduct=(userId,authToken,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body: (product)
    }).then(response=>{
        return response.json();
    }).catch(err=>{
      return  console.log(err);
    })
}


export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).catch(err => {
        return console.log(err)
    })
}


export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const deleteProduct = (productId, userId, authToken) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, authToken, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};