import React, {useState, useEffect, useContext} from 'react'
import axiosPrivate from '../../../api/axios';
import AuthContext from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';

function WishlistComponent() {
    const { auth } = useContext(AuthContext)
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({})

    const handleDeleteWish=(bookId)=> {
        axiosPrivate.delete(`/users/${auth.id}/wishlist/${bookId}`)
        .then((res) =>{
            setBooks(
                books.filter((book) => {
                  return book.Book.id !== bookId;  
                })
            );
            
        })
        .catch((err) => {

        })
    }

    const handleFulfillWish=(bookId)=> {
        let book = books.find(book => book.Book.id === bookId);
        book.Wishlist.fulfilled = !book.Wishlist.fulfilled;
        axiosPrivate.put(`/users/${auth.id}/wishlist/${bookId}`, {
            id: bookId,
            wishlist: {
                fulfilled: book.Wishlist.fulfilled 
            }
        })
        .then((res) =>{
            if(filter) {
                handleFilter(filter.fulfilled)
            } else {
                const newBooks = [...books];
                setBooks([...newBooks])
            }
        })
        .catch((err) => {

        })
    }

    const handleFilter=(fulfilled)=> {
        setFilter({fulfilled: fulfilled})
        setLoading(true);
        axiosPrivate.get(`/users/${auth.id}/wishlist`, {
            params: {
                fulfilled: fulfilled
            }
        })
        .then((res) => {
            if(res.data) {
                setBooks(res.data.UserBooks)
            } else {
                setBooks([])
            }
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false)
        })
    }

    const handleGetAll=()=> {
        setFilter(null);
        setLoading(true);
        axiosPrivate.get(`/users/${auth.id}/wishlist`)
        .then((res) => {
            setBooks(res.data.UserBooks)
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false)
        })
    }

    useEffect(() => {
        setFilter(null);
        handleGetAll()
    }, [])

  return (
    <>
    <div className='delete_edit'>
        <button className='edit_element' onClick={()=>handleGetAll()} disabled={!filter}>All</button>
        <button className='edit_element' onClick={()=> handleFilter('true')} 
        disabled={filter && filter.fulfilled === 'true'}>
            Fulfilled <FontAwesomeIcon icon={faCheck}/>
            </button>
        <button className='edit_element' onClick={()=> handleFilter('false')} 
        disabled={filter && filter.fulfilled === 'false'}>
            Current <FontAwesomeIcon icon={faStar}/>
            </button>
    </div>
    {
        
    loading ?
    <p>loading</p>
    :
    books.length > 0 ?
    <ul className="library_list">
        {
            books.map((book) => {
                return (
                    <li className="book_element" key={book.Book.id}>
                        <div className='book-list-image'>
                        {
                            book.Book.hasCover ?
                            <img src={'/images/' + book.Book.coverPath}/>
                            :<></>
                        }
                        </div>
                        <div><h1>{book.Book.title}</h1></div>
                        <div className='delete_edit'>
                        {
                            book.Wishlist.fulfilled ?
                            <button className='edit_element' onClick={()=>handleFulfillWish(book.Book.id)}>
                                Fulfilled <FontAwesomeIcon icon={faCheck}/>
                                </button>
                            :
                            <button className='edit_element' onClick={()=>handleFulfillWish(book.Book.id)}>
                                Unfulfilled <FontAwesomeIcon icon={faStar}/>
                                </button>
                        }
                        <button className='edit_element' onClick={() => handleDeleteWish(book.Book.id)}>Delete</button>

                        </div>
                    </li>
                )
            })
        }
    </ul>
    :
    <p>No books found</p>
    }
    
    </>
    
  )
}

export default WishlistComponent