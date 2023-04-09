import React, {useState, useEffect, useRef, useContext} from 'react'

import axiosPrivate from '../../api/axios'
import useAccessToken from '../../hooks/useAccessToken';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate , useLocation, Link } from 'react-router-dom'

const EMAIL_REG = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
const PASSWORD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&*%$#@]).{8,}$/


function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth, setAuth} = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const accessToken = useAccessToken();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [login, setLogin] = useState('');
    const [validLogin, setValidLogin] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if(auth.id) {
            navigate('/');
        }
        userRef.current.focus();
    }, []);


    useEffect(() => {
        const result = EMAIL_REG.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        setValidLogin(login.indexOf(' ') < 0);
    }, [login])

    useEffect(() => {
        const result = PASSWORD_REG.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('');
   
    }, [login, email, password, matchPassword])

    const handleSignUp = async (e) => {
        e.preventDefault();
        const valid_login = login.indexOf(' ') < 0;
        const valid_email = EMAIL_REG.test(email);
        const valid_password = PASSWORD_REG.test(password);
        const valid_match = matchPassword === password
        if(!(valid_login && valid_email && valid_password && valid_match)) {
            setErrorMessage('How did you do this');
            return;
        }
        await axiosPrivate.post('/users/signup', 
        JSON.stringify(
            {login: login, email: email, password:password}
            ),
        )
        .then((res) => {
            accessToken.setItem(res.data.accessToken);
            setAuth({id: res.data.id});
            localStorage.setItem('id', res.data.id)
            navigate('/');
            console.log(res);
        })
        .catch((err) => {
            if(err === 'Conflict') {
                setErrorMessage('User with this email already exists')
            }
        })
    } 

    return (
        <div className="content">
            <div className='edit_container'>
                <h1>Sign Up page</h1>
                <p ref={errRef} 
                className={errorMessage ? "error" : "empty"}
                 aria-live="assertive">
                    {errorMessage}
                </p>

                <form className='edit_form' onSubmit={handleSignUp}>
                    <input type='text' placeholder='Login' required 
                    ref={userRef}
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)}
                    aria-invalid={validLogin ? "false" : "true"}
                    autoComplete="off"
                    aria-describedby='loginerror'
                    onFocus={() => setLoginFocus(true)}
                    onBlur={()=> setLoginFocus(false)}
                    />
                
                    <p id="loginerror" className={!loginFocus && login 
                    && !validLogin ? "error" : "empty"}>
                        Login should not contain spaces
                    </p>
                
                    <input type='text' placeholder='Email' required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                    autoComplete="off"
                    aria-describedby='emailerror'
                    onFocus={() => setEmailFocus(true)}
                    onBlur={()=> setEmailFocus(false)}
                    />

                    <p id="emailerror" className={!emailFocus && email 
                    && !validEmail ? "error" : "empty"}>
                        Invalid email
                    </p>

                    <input type='password' placeholder='Password' required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby='passworderror'
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={()=> setPasswordFocus(false)}
                    />

                    <p id="passworderror" className={!passwordFocus && password 
                    && !validPassword ? "error" : "empty"}>
                        Invalid password, minmum length 8 must contain at least one capital letter,
                        at least one small letter, at least one number and at least one of characters &*%$#@
                    </p>
                    
                    <input type='password' placeholder='Repeat password' required 
                    value={matchPassword} 
                    onChange={(e) => setMatchPassword(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby='matchpassword'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={()=> setMatchFocus(false)}
                    />

                    <p id="matchpassword" className={matchPassword 
                    && !validMatch ? "error" : "empty"}>
                        Passwords don't match
                    </p>
                    
                    <p>Have an account? Go to <Link to='/login'>Log in</Link> page</p>
                    <button type='submit' disabled={(!validEmail || !validLogin || !validPassword || !validMatch)}>Sign up</button>

                </form>
            </div>
        </div>
    );
}

export default SignUp