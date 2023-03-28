import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function AddGenre() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    
    const handleAdd = (e) => {
        e.preventDefault();
        axios.post('/genres', {
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
            <form className='edit_form' onSubmit={handleAdd}>
                <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                <button className='edit_element' type='submit'>Save</button>
                <Link to='/genres' className='edit_element'>Back</Link>
            </form>
        </div>
    );
}

export default AddGenre