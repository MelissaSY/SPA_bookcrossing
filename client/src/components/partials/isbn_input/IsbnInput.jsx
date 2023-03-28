import React, { useEffect } from 'react'

function IsbnInputComponent({setIsbn, isbn}) {

    useEffect(() => {
        filterIsbn(isbn);
    }, [])


    const filterIsbn=(notFormatteIsbn) => {
        let formatedIsbn = notFormatteIsbn.replace(/[^0-9]/g, ''); 
        setIsbn(formatedIsbn.slice(0, 13));
    }

    const handleIsbn = (e) => {
        filterIsbn(e.target.value);
    }

    return (
        <input type='text' placeholder='ISBN-13' value={isbn} onChange={handleIsbn}/>       
    )

}

export default IsbnInputComponent;