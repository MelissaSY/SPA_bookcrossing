import React, {useState, useEffect, useContext} from 'react'
import Header from '../header/Header';
import axiosPrivate from '../../api/axios';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function Books() {
    const [books, setBooks] = useState([]);
    const {auth, setAuth} = useContext(AuthContext)
    useEffect(() => {
        axiosPrivate.get('/books')
        .then((res)=>{
            setBooks(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);


    const deleteBook=(id)=> {
        axiosPrivate.delete(`books/${id}`);
        setBooks(
            books.filter((book) => {
              return book.id !== id;  
            })
        );
    }

    return (
        <div>
            <Header/>
            <div className="content">
                
            <ul className="library_list">
                {
                    auth.id ? 
                    <li className="book_element no-padding no-border">
                        <Link to='add' className='add_element'>Add book</Link>
                    </li>
                    : 
                    <></>
                }
               
                {
                books.map((book) => {
                    let image = <p>No image</p>;
                    if(book.hasCover) {
                        let path = `/images/${book.coverPath}`;
                        image = <img src={path}/>
                    }
                    return (
                        <li className="book_element" key={book.id}>
                            <div className='book-list-image'>{image}</div>
                            <div><Link to={`${book.id}`}><h1 className='one_line_elipsis'>{book.title}</h1></Link>
                            {
                                auth.id ? 
                                <div className='edit_icons'>
                                   <Link to={`edit/${book.id}`} className='edit_icon'><FontAwesomeIcon icon={faPen} className='large-font'/></Link>                
                                   <button onClick={() => deleteBook(book.id)} className='edit_icon'><FontAwesomeIcon icon={faTrashCan} className='large-font'/></button>
                                </div> :
                                <></>
                            }
                            </div>
                        </li>
                    );
                })
            }
            </ul>
            </div>
        </div>
    );
}

export default Books