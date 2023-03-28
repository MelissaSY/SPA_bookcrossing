import React, {useState, useEffect} from 'react'
import Header from '../header/Header';

function TouringBooks() {
    const [backendData, setBackendData] = useState([])

    useEffect(() => {
        fetch('/touring_books').then(
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

export default TouringBooks