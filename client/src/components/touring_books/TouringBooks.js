import React, {useState, useEffect, useContext} from 'react'
import Header from '../header/Header';
import axiosPrivate from '../../api/axios';
import AuthContext from '../../contexts/AuthContext';

function TouringBooks() {
    const [backendData, setBackendData] = useState([])
    const [loading, setLoading] = useState(false);
    const {auth, setAuth} = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        axiosPrivate.get('/touring_books', {
            withCredentials: true
        })
        .then((res) => {
            setBackendData(res.data.payload);
            setAuth({id: res.data.user.id});
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setAuth({id: null});
            setLoading(false);
        })
        
    }, [])
    return (
        <div>
            <Header/>
            {
                loading ? <p>loading..</p> :
                auth.id ? <p>{backendData}</p> :
                <p>not authrorized</p>
            }
            
        </div>
    );
}

export default TouringBooks