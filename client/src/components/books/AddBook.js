import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import ListComponent from '../partials/search/SearchList.jsx';
import ImageUploadComponent from '../partials/image_view/ImageView';
import IsbnInputComponent from '../partials/isbn_input/IsbnInput';
import FilterAuthors from '../../filters/FilterAuthor.js';
import FilterGenre from '../../filters/FilterGenre.js';
function AddBook() {
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
        axios.get('/genres')
        axios.get('/genres')
        .then((res)=>{
            setAllGenre(res.data);
            axios.get('/authors')
            .then((res)=>{
                setAllAuthors(res.data);
            })
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);

   
    const handleAdd = (e) => {
        e.preventDefault();
        let genre = [];
        selectedGenre.forEach((element) => {
            genre.push(element.id);
        })
        let authors = [];
        selectedAuthor.forEach((element) => {
            authors.push(element.id);
        })
        axios.post('/books', {
            title: title,
            genre: genre,
            authors: authors,
            isbn: isbn,
            annotation: annotation,
            hasImage: hasImage,
            filepath: filepath
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
            <form className='edit_form' onSubmit={handleAdd}>
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

export default AddBook