import React from 'react'
import "../styles.css";
import Base from "./Base";
import {API} from "../backend";




export default function Home() {
    console.log("API is", API);
    return (
        <Base>
            <h1> This is the Base</h1>
        </Base>
    )
}
