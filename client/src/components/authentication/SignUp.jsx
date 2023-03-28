import React, {useState, useEffect} from 'react'
import Header from '../header/Header';
import axios from 'axios'
import { Link } from 'react-router-dom';

function SignUp() {
    
    useEffect(() => {
        axios.get('/users/signup')
        .then((res)=>{
            
        })
        .catch((err) => {
            
        });
        
    }, []);


    return (
        <div>
            <Header/>
            <div className="content">
            <span>Sign Up page</span>
            </div>
        </div>
    );
}

export default SignUp