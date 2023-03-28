import React, {useEffect, useState} from 'react'
import Header from '../header/Header';

function MainPage() {
    const [backendData, setBackendData] = useState([])

    useEffect(() => {
        fetch('/api').then(
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

export default MainPage