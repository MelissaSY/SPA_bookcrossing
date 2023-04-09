import React, {useState, useEffect, useContext} from 'react'
import Header from '../header/Header';
import axiosPrivate from '../../api/axios';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Genres() {
    const [genres, setGenres] = useState([]);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        axiosPrivate.get('/genres')
        .then((res)=>{
            setGenres(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);


    const deleteGenre=(id)=> {
        axiosPrivate.delete(`genres/${id}`);
        setGenres(
            genres.filter((genre) => {
              return genre.id !== id;  
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
                        <li className="genre_element  no-padding no-border" key={-1}>
                            <Link to='add' className='add_element'>Add genre</Link>
                        </li>
                        :
                        <></>
                    }
                    {
                        genres.map((genre) => {
                            return (
                                <li className="genre_element" key={genre.id}>
                                    <h1>{genre.name}</h1>
                                    {
                                        auth.id ?
                                        <div className='edit_icons'>
                                            <Link to={`edit/${genre.id}`} className='edit_icon'>
                                            
                                                <FontAwesomeIcon icon={faPen} className='large-font'/>
                                            </Link>
                                            <button className='edit_icon' onClick={() => deleteGenre(genre.id)}>
                                                <FontAwesomeIcon icon={faTrashCan} className='large-font'/>
                                            </button>
                                        </div>
                                        :
                                        <></>
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Genres