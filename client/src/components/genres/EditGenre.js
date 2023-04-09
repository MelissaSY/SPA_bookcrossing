import React, {useEffect, useState} from 'react'
import axiosPrivate from '../../api/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditGenre() {
    const  genreId = useParams()['id']; 
    const [name, setName] = useState('');
    const [id, setId] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        axiosPrivate.get("/genres/"+genreId)
        .then((res)=>{
            setName(res.data.name);
            setId(res.data.id);
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        axiosPrivate.put(`/genres/${id}`, {
            id: id,
            name: name,
        })
        .then((res) => {
            navigate('/genres');
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className='edit_container'>
        <h1>Genre</h1>
            <form className='edit_form' onSubmit={handleEdit}>
                <input type='text' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                <button className='edit_element' type='submit'>Save</button>
                <Link to='/genres' className='edit_element'>Back</Link>
            </form>
        </div>
    );
}

export default EditGenre