import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ListComponent from '../partials/search/SearchList.jsx';
import ImageUploadComponent from '../partials/image_view/ImageView';
import IsbnInputComponent from '../partials/isbn_input/IsbnInput';
import FilterAuthors from '../../filters/FilterAuthor'; 
import FilterGenre from '../../filters/FilterGenre';

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
    
    const navigate = useNavigate();   

    useEffect(() => {
        let allG = [];
        let allA = [];
        axios.get('/genres')
        .then((res)=>{
            allG = res.data;
            setAllGenre(res.data);
            axios.get('/authors')
            .then((res)=>{
                allA = res.data;
                setAllAuthors(res.data);
                axios.get('/books/'+bookId)
                .then((res) => {
                    setTitle(res.data.title);
                    setIsbn(res.data.isbn);
                    setAnnotation(res.data.annotation);
                    let currentGenre = allG.filter(element => res.data.genre.includes(element.id));
                    let currentAuthor = allA.filter(element => res.data.authors.includes(element.id));
                    setSelectedGenre(currentGenre);
                    setSelectedAuthor(currentAuthor);
                    setId(res.data.id);
                    setHasImage(res.data.hasimage);
                    setFilepath(res.data.filepath);
                })
            })
        })
        .catch((err) => {
            console.log(err);
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
        axios.put(`/books/${bookId}`, {
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
        });
    };

    return (
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
    );
}

export default EditBook