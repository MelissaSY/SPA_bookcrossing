import React, {useState, useEffect} from 'react'
import Header from '../header/Header';
import axios from 'axios'
import { Link } from 'react-router-dom';

function LogIn() {
    
    // useEffect(() => {
    //     axios.get('/users/login')
    //     .then((res)=>{
            
    //     })
    //     .catch((err) => {
            
    //     });
        
    // }, []);


    return (
        <div>
            <Header/>
            <div className="content">
            <span>Log In page</span>
            </div>
        </div>
    );
}

export default LogIn