import React, {useState, useEffect} from 'react'
import Header from '../header/Header';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Authors() {
    const [authors, setAuthors] = useState([]);
    useEffect(() => {
        axios.get('/authors')
        .then((res)=>{
            setAuthors(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);


    const deleteAuthor=(id)=> {
        axios.delete(`authors/${id}`);
        setAuthors(
            authors.filter((author) => {
              return author.id !== id;  
            })
        );
    }

    return (
        <div>
            <Header/>
            <div className="content">
            <ul className="library_list">
                <li className="author_element no-padding no-border">
                    <Link to='add' className='add_element'>Add author</Link>
                </li>
                {
                    authors.map((author) => {
                    return (
                        <li className="author_element" key={author.id}>
                            <div className='author_element_info'>
                                <h1>{author.name} {author.surname}</h1>

                                <div className='string-enum'>
                                    <span>{ author.pseudonyms.join(', ') } </span>
                                </div>
                                <div className='delete_edit'>
                                    <button className='edit_element' onClick={() => deleteAuthor(author.id)}>Delete</button>
                                    <Link to={`edit/${author.id}`} className='edit_element'>Edit</Link>                
                                </div>
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

export default Authors