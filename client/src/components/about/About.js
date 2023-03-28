import React, {useEffect, useState} from 'react'
import Header from '../header/Header';

function About() {
    const [backendData, setBackendData] = useState([])

    useEffect(() => {
        fetch('/about').then(
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

export default About