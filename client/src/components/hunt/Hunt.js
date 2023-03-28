import React, {useState, useEffect} from 'react'
import Header from '../header/Header';

function Hunt() {
    const [backendData, setBackendData] = useState([])

    useEffect(() => {
        fetch('/hunt').then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        ).then(
            console.log(backendData)
        );
    }, [])
    return (
        <div>
            <Header/>
            <p>{backendData}</p>
        </div>
    );
}

export default Hunt