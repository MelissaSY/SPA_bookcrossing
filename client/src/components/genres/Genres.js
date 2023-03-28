import React, {useState, useEffect} from 'react'
import Header from '../header/Header';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Genres() {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        axios.get('/genres')
        .then((res)=>{
            setGenres(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);


    const deleteGenre=(id)=> {
        axios.delete(`genres/${id}`);
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
                    <li className="genre_element  no-padding no-border" key={-1}>
                        <Link to='add' className='add_element'>Add genre</Link>
                    </li>
                    {
                        genres.map((genre) => {
                            return (
                                <li className="genre_element" key={genre.id}>
                                    <h1>{genre.name}</h1>
                                    <div className='delete_edit'>
                                        <button className='edit_element' onClick={() => deleteGenre(genre.id)}>Delete</button>
                                        <Link to={`edit/${genre.id}`} className='edit_element'>Edit</Link>
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

export default Genres