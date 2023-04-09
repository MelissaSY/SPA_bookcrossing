import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ListComponent from '../partials/search/SearchList.jsx';
import ImageUploadComponent from '../partials/image_view/ImageView';
import IsbnInputComponent from '../partials/isbn_input/IsbnInput';
import FilterAuthors from '../../filters/FilterAuthor'; 
import FilterGenre from '../../filters/FilterGenre';
import axiosPrivate from '../../api/axios';

function EditBook() {
    const bookId = useParams()['id'];
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [annotation, setAnnotation] = useState('');

    const [selectedGenre, setSelectedGenre] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState([]);
    
    const [allGenre, setAllGenre] = useState([]);
    const [allAuthors, setAllAuthors] = useState([]);

    const [filepath, setFilepath] = useState('');
    const [hasImage, setHasImage] = useState(false);

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();   

    useEffect(() => {
        setLoading(true)
        let allG = [];
        let allA = [];
        const fetchdata = async () => {
            let res = await axiosPrivate.get('/genres');
            allG = res.data;
            setAllGenre(res.data);
            
            res = await axiosPrivate.get('/authors')
            allA = res.data;
            setAllAuthors(res.data);
            res = await axiosPrivate.get('/books/'+bookId)
            setId(res.data.id);
            setTitle(res.data.title);
            setIsbn(res.data.isbn || '');
            setAnnotation(res.data.annotation);
            setHasImage(res.data.hasCover);
            setFilepath(res.data.coverPath);
            let currentGenre = allG.filter((allgenre) => 
                res.data.Genres.some((genre) => 
                genre.id === allgenre.id));
            setSelectedGenre(currentGenre);

            let currentAuthor = allA.filter((allauthor) => 
                res.data.Authors.some((auhtor) => 
                auhtor.id === allauthor.id));
            setSelectedAuthor(currentAuthor);
    }
    fetchdata()
    .then(() => {
        
        setLoading(false);
    })
    .catch((err) => {
        setLoading(false);
        console.log(err);
        if(err === 'Unauthorized') {
            navigate('/login')
        }
    }); 
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        let genre = [];
        selectedGenre.forEach((element) => {
            genre.push(element.id);
        })
        let authors = [];
        selectedAuthor.forEach((element) => {
            authors.push(element.id);
        })
        axiosPrivate.put(`/books/${bookId}`, {
            id: id,
            title: title,
            genre: genre,
            authors: authors,
            isbn: isbn,
            annotation: annotation,
            hasimage: hasImage,
            filepath: filepath,
        })
        .then((res) => {
            navigate('/books');
        })
        .catch((err) => {
            console.log(err);
            if(err === 'Unauthorized') {
                navigate('/login')
            }
        }); 
    };

    return (
        <>
        {
            loading ? <p>loading</p> : 
            <div className='edit_container'>
            <h1>Book</h1>
            <ImageUploadComponent 
                filepath={filepath} setFilepath={setFilepath} hasImage = {hasImage} setHasImage={setHasImage}
                />
            <form className='edit_form' onSubmit={handleEdit}>
                <IsbnInputComponent isbn={isbn} setIsbn={setIsbn}/>
                <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type='text' placeholder='Annotation' value={annotation} onChange={(e) => setAnnotation(e.target.value)}/>
                <ListComponent selectedItems={selectedGenre}
                 setSelected={setSelectedGenre} showParameters={['name']} allItems={allGenre} itemsName='Genre' filterFunction={FilterGenre}/>
                <ListComponent selectedItems={selectedAuthor}
                 setSelected={setSelectedAuthor} showParameters={['name', 'surname']} allItems={allAuthors} itemsName='Author' filterFunction={FilterAuthors}/>
                <button type='submit' className='edit_element'>Save</button>
                <Link to='/books' className='edit_element'>Back</Link>
            </form>
            </div>
        }
        </>
    );
}

export default EditBook