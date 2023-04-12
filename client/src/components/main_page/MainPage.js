import React, {useContext, useEffect, useState} from 'react'
import Header from '../header/Header';
import axiosPrivate from '../../api/axios';
import AuthContext from '../../contexts/AuthContext';
import WishlistComponent from '../partials/userbooklists/WishlistComponent';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const [backendData, setBackendData] = useState([])
    const [loading, setLoading] = useState(false);
    const [bookList, setBookList] = useState();
    const { setAuth, auth } = useContext(AuthContext)
    const [wishlist, setWishlist] = useState(false)
    const navigate = useNavigate()

    const handleGetWishlist = () => {
        setWishlist(true);
        setBookList(<WishlistComponent/>)
    }

    useEffect(() => {
        setBookList(<></>)
        setLoading(true);
        axiosPrivate.get(`/users/${localStorage.getItem('id')}`)
        .then((data) => {
            setBackendData(data.data)
            setLoading(false)
        })
        .catch((err) => {
            localStorage.removeItem('id');
            setAuth({id: null})
            navigate('/login')
        })
    }, [])
    return (
        
        <div>
            <Header/>
            {
            loading ?
            <p>loading</p>
            :
            <div className='content'>
                <div className='delete_edit'>
                    <button className='edit_element' onClick={handleGetWishlist} disabled={wishlist}>Wishlist</button>
                </div>
                {bookList}
            </div>
            }
        </div>
    );
}

export default MainPage