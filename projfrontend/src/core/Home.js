import React,{useState,useEffect} from 'react'
import "../styles.css";
import Base from "./Base";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';




export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct=()=>{
        getProducts().then(data=>{
            if(data.errors){
                setError(data.errors)
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProduct()
    }, [])

    //console.log("API is", API);
    return (
        <Base>
            <div className="row text-center">
                
                <div className="row">
                    {products.map((product,index)=>{
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product={product}/>
                            </div>
                        )
                    })}
                </div>
            </div> 
        </Base>
    )
}
