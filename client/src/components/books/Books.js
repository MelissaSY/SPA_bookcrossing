import React, {useState, useEffect} from 'react'
import Header from '../header/Header';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/books')
        .then((res)=>{
            setBooks(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);


    const deleteBook=(id)=> {
        axios.delete(`books/${id}`);
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
                <li className="book_element no-padding no-border">
                    <Link to='add' className='add_element'>Add book</Link>
                </li>
                {
                books.map((book) => {
                    
                    let image = <></>;
                    if(book.hasimage) {
                        let path = `/images/${book.filepath}`;
                        image = <img src={path}/>
                    }
                    return (
                        <li className="book_element" key={book.id}>
                            <div className='book-list-image'>{image}</div>
                            <div><h1>{book.title}</h1></div>
                            <div className='delete_edit'>
                                <button className='edit_element' onClick={() => deleteBook(book.id)}>Delete</button>
                                <Link to={`edit/${book.id}`} className='edit_element'>Edit</Link>                
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