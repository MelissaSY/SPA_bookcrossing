import React, {useRef, useState, useEffect, useContext} from 'react'

import axiosPrivate from '../../api/axios'
import { useNavigate , useLocation, Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext';
import useAccessToken from '../../hooks/useAccessToken';

const LOGIN_URL = '/users/login'

function LogIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, setAuth } = useContext(AuthContext);

    const accessToken = useAccessToken();

    const userRef = useRef();
    const errRef = useRef();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [login, password])


    const handleLogIn = async (e) => { 
        e.preventDefault();
        try {
            await axiosPrivate.post(LOGIN_URL, 
                JSON.stringify({login, password})
            )
            .then((res) => {
                accessToken.setItem(res.data.accessToken);
                localStorage.setItem('id', res.data.id);
                setAuth({id: res.data.id})
                navigate('/');
            });
        } catch(err) {
            setErrorMessage('No user found')
        }
    }

    return (
        <div className="content">
            <div className='edit_container'>
            
            <h1>Log in page</h1>
                <p ref={errRef} 
                    className={errorMessage ? "error" : "empty"}
                    aria-live="assertive">
                    {errorMessage}
                </p>

        <form className='edit_form' onSubmit={handleLogIn}>
            <input type='text' placeholder='Login' required 
            ref={userRef}
            value={login} 
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="off"
            />

            <input type='password' placeholder='Password' required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
            <p>Don't have an account? Go to <Link to='/signup'>Sign up</Link> page</p>
           
            <button type='submit' disabled={login.trim() === '' || password.trim() === ''}>Log in</button>
            
            </form>
            </div>
        </div>
    );
}

export default LogIn