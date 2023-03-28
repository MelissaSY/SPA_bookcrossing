import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function AddAuthor() {
    const [pseudonyms, setPseudonyms] = useState([]);
    const [newPseudonym, setNewPseudonym] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const navigate = useNavigate();
    const handleAdd = (e) => {
        e.preventDefault();
        axios.post('/authors', {
            pseudonyms: pseudonyms,
            name: name,
            surname: surname,
            patronymic: patronymic,
        })
        .then((res) => {
            navigate('/authors');
        })
        .catch((err) => {
            console.log(err);
        });
    };
    const addPseudonym = () => {
        setPseudonyms(authorPseudonyms => [...authorPseudonyms, newPseudonym]);
        setNewPseudonym('');
    }
    const removePseudonym = (pseudonym) => {
        setPseudonyms(pseudonyms.filter(item => item !== pseudonym));
    }
    return (
        <div className='edit_container'>
            <h1>Author</h1>
            <form className='edit_form' onSubmit={handleAdd}>
                <button className='edit_element' type='submit'>Save</button>
                <Link to='/authors' className='edit_element'>Back</Link>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type='text' placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)}/>
                <input type='text' placeholder='Patronymic' value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                <input type='text' placeholder='Pseudonym' value={newPseudonym} onChange={(e) => setNewPseudonym(e.target.value)}/>
                <input type='button' value='Add Pseudonym'className='edit_element' onClick={addPseudonym}/>
                <div className='author_pseudonyms'>{pseudonyms.map( pseudonym =>
                    <div className='edit_author_pseudonym'>
                        { pseudonym }
                        <input type='button' className='edit_element' value='Remove' onClick={() => removePseudonym(pseudonym)}/> 
                    </div>
                )}</div>
            </form>
        </div>
    );
}

export default AddAuthor