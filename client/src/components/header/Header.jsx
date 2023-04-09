import React, {useContext, useEffect, useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import useAccessToken from '../../hooks/useAccessToken'
import axiosPrivate from '../../api/axios'
import '../../App.css'

function Header() {
  const accessToken = useAccessToken();
  const {auth, setAuth} = useContext(AuthContext);
  const naigation = useNavigate()
  const [show, setShow] = useState(false);
  

  const handleLogout = (e) => {
    e.preventDefault();
    axiosPrivate.post('/users/logout')
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      accessToken.removeItem();
      localStorage.removeItem('id')
      setAuth({id: null})
      naigation('/about')

    })
  }

  return (
    <header>
        <nav>
            <ul className="navigation">
              {
                auth.id ? 
                  <li><NavLink to='/'>Home</NavLink></li>              
                  :
                  <></>
              }
              <li><NavLink to='/about'>About book-crossing</NavLink></li>
              <li><NavLink to='/books'>All books</NavLink></li>
              <li><NavLink to='/touring_books'>Touring books</NavLink></li>
              <li><NavLink to='/hunt'>Hunt</NavLink></li>
              <li><NavLink to='/places'>Places</NavLink></li>
              <li><NavLink to='/authors'>Authors</NavLink></li>
              <li><NavLink to='/genres'>Genres</NavLink></li>
              {
                !auth.id ? <li><NavLink to='/signup' className='sign-login'>Sign up</NavLink></li> :
                 <li><button onClick={handleLogout} className='sign-login'>Log out</button></li>
              }
              {
                !auth.id ? <li><NavLink to='/login' className='sign-login'>Log in</NavLink></li> : <></>
              }
               
            </ul>
        </nav>
    </header>
  )
}

export default Header