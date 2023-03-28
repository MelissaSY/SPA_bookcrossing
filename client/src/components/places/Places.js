import React, {useState, useEffect} from 'react'
import Header from '../header/Header';

function Places() {
    const [backendData, setBackendData] = useState([])

    useEffect(() => {
        fetch('/places').then(
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

export default Places