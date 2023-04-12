import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ListComponent from '../partials/search/SearchList.jsx';
import ImageUploadComponent from '../partials/image_view/ImageView';
import IsbnInputComponent from '../partials/isbn_input/IsbnInput';
import FilterAuthors from '../../filters/FilterAuthor'; 
import FilterGenre from '../../filters/FilterGenre';
import axiosPrivate from '../../api/axios';
import AuthContext from '../../contexts/AuthContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons'

function BookDetails() {
    const bookId = useParams()['id'];
    const { auth } = useContext(AuthContext)
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [annotation, setAnnotation] = useState('');

    const [filepath, setFilepath] = useState('');
    const [hasImage, setHasImage] = useState(false);

    const [loading, setLoading] = useState(false);

    const [inWishlist, setInWishlist] = useState(false);
    const [fulfilled, setFulfilled] = useState(false);

    const [authors, setAuthors] = useState([]);
    const [genre, setGenre] = useState([]);
    
    const navigate = useNavigate();   

    useEffect(() => {
        setLoading(true)
        
    
    axiosPrivate.get('/books/'+bookId)
    .then((res) => {
        setTitle(res.data.title);
        setIsbn(res.data.isbn || '');
        setAnnotation(res.data.annotation);
        setHasImage(res.data.hasCover);
        setFilepath(res.data.coverPath);
        setGenre(res.data.Genres);
        setAuthors(res.data.Authors);
        if(auth.id) {
            axiosPrivate.get(`/users/${auth.id}/wishlist/${bookId}`)
            .then((res) => {
                setInWishlist(res.data !== null)
                setFulfilled(res.data.Wishlist.fulfilled)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
    })
    .catch((err) => {
        console.log(err);
        if(err === 'Unauthorized') {
            navigate('/login')
        }
    }); 
    }, []);

    const handleAddWish=()=> {
        axiosPrivate.post(`/users/${auth.id}/wishlist`, {
            id: bookId
        })
        .then((res) =>{
            setInWishlist(true);
        })
        .catch((err) => {

        })
    }

    const handleDeleteWish=()=> {
        axiosPrivate.delete(`/users/${auth.id}/wishlist/${bookId}`)
        .then((res) =>{
            setInWishlist(false);
            setFulfilled(false);
        })
        .catch((err) => {

        })
    }

    const handleFulfillWish=()=> {
        axiosPrivate.put(`/users/${auth.id}/wishlist/${bookId}`, {
            id: bookId,
            wishlist: {
                fulfilled: !fulfilled
            }
        })
        .then((res) =>{
            setFulfilled(!fulfilled);
        })
        .catch((err) => {

        })
    }

    return (
        <div className='content'>
        {
            loading ? <p>loading</p> : 
            <div className='edit_container'>
                <h1>{title}</h1>
                    <div className='book-list-image'>
                    {
                        hasImage ?
                        <img src={'/images/' + filepath}/>
                        :<></>
                    }
                    </div>
                <p>ISBN-13: {isbn}</p>
                <p>Authors: </p>
                {
                    authors.length > 0 ?
                    <span>
                    {
                        authors.map((author) => {
                            return (
                                <button className='border-bottom-pink white-background' disabled={true}>
                                    {author.name + ' ' + author.surname}
                                </button>
                                
                            )
                        })
                    }
                    </span>
                    :
                    <p>No authors specified</p>
                }
                <p>Genre: </p>
                {
                    genre.length > 0 ?
                    <span>
                    {
                        genre.map((genre) => {
                            return (
                                <button className='border-bottom-pink white-background' disabled={true}>
                                    {genre.name}
                                </button>
                                
                            )
                        })
                    }
                    </span>
                    :
                    <p>No authors specified</p>
                }
                {
                    inWishlist ?
                    fulfilled ?
                    <button onClick={handleFulfillWish} className='edit_element'>
                         Mark as unfulfilled <FontAwesomeIcon icon={faCheck}/>
                         </button>
                    :
                    <button onClick={handleFulfillWish} className='edit_element'> 
                    Mark as fulfilled <FontAwesomeIcon icon={faStar}/>
                    </button>
                    :
                    <></>
                }
                {
                    auth.id ?
                    inWishlist ?
                    <button onClick={handleDeleteWish} className='edit_element'>Delete from wishlist</button>
                    :
                    <button onClick={handleAddWish} className='edit_element'>Add to wishlist</button>
                    :
                    <></>
                }
                <Link to='/books' className='edit_element'>Back</Link>
                
                
                {
                    annotation ?
                    <p>Annotation: {annotation}</p>
                    :
                    <></>
                }
            </div>
        }
        </div>
    );
}

export default BookDetails