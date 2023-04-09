import React, {useState, useEffect, useContext} from 'react'
import Header from '../header/Header';
import  axiosPrivate from '../../api/axios'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Authors() {
    const [authors, setAuthors] = useState([]);
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        axiosPrivate.get('/authors')
        .then((res)=>{
            setAuthors(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);


    const deleteAuthor=async (id)=> {
        try {
            await axiosPrivate.delete(`authors/${id}`);
            setAuthors(
                authors.filter((author) => {
                  return author.id !== id;  
                })
            );
        } catch(err) {
            if(err === 'Unauthorized') {
                navigate('/login');
            }
        }
    }

    return (
        <div>
            <Header/>
            <div className="content">
            <ul className="library_list">
                {
                    auth.id ? 
                    <>
                    <li className="author_element no-padding no-border" key={-1}>
                        <Link to='add' className='add_element'>
                            Add author
                        </Link>
                    </li>
                    </>
                    :
                    <></>
                }
                {
                    authors.map((author) => {
                    return (
                        <li className="author_element" key={author.id}>
                            <div className='author_element_info'>
                                <h1>{author.name} {author.surname}</h1>

                                <div className='string-enum'>
                                    <span>{ author.pseudonyms.join(', ') } </span>
                                </div>
                                {
                                    auth.id ? 
                                    <>
                                        <div className='edit_icons'>
                                            <Link to={`edit/${author.id}`} className='edit_icon'>
                                                <FontAwesomeIcon icon={faPen } className='large-font'/>
                                            </Link>      
                                            <button className='edit_icon' onClick={() => deleteAuthor(author.id)}>
                                                <FontAwesomeIcon icon={faTrashCan} className='large-font'/>
                                            </button>          
                                        </div>
                                    </>
                                    :
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

export default Authors