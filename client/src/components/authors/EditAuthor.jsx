import React, {useEffect, useState} from 'react'
import axiosPrivate from '../../api/axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function EditAuthor() {
    const  authorsId = useParams()['id']; 
    const [name, setName] = useState('');
    const [pseudonyms, setPseudonyms] = useState([]);
    const [newPseudonym, setNewPseudonym] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [id, setId] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        axiosPrivate.get("/authors/"+authorsId)
        .then((res)=>{
            setPseudonyms(res.data.pseudonyms);
            setName(res.data.name);
            setSurname(res.data.surname);
            setPatronymic(res.data.patronymic);
            setId(res.data.id);
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        axiosPrivate.put(`/authors/${id}`, {
            id: id,
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
            <form className='edit_form' onSubmit={handleEdit}>
                <button className='edit_element' type='submit'>Save</button>
                <Link to='/authors' className='edit_element'>Back</Link>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type='text' placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)}/>
                <input type='text' placeholder='Patronymic' value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                <input type='text' placeholder='Pseudonym' value={newPseudonym} onChange={(e) => setNewPseudonym(e.target.value)}/>
                <input type='button' value='Add Pseudonym'className='edit_element' onClick={addPseudonym}/>
                <div className='author_pseudonyms'>{
                pseudonyms.map( pseudonym =>
                    <div className='edit_author_pseudonym' key={pseudonym}>
                        { pseudonym }
                        <button className='edit_icon' value='Remove' onClick={() => removePseudonym(pseudonym)}>
                            <FontAwesomeIcon icon={faXmark} className='large-font'/>    
                        </button> 
                    </div>
                )}
                </div>
            </form>
        </div>
    );
}

export default EditAuthor