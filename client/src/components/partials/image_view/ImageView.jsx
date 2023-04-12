import React, { useEffect, useState } from 'react'
import axiosPrivate from '../../../api/axios'
import { useNavigate } from 'react-router-dom';

function ImageUploadComponent ({filepath, setFilepath, 
    setHasImage, hasImage}) {

    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        if(hasImage) {
            setImagePreview('/images/'+filepath)
        }
    }, [imagePreview, image, hasImage])
    
    const preview = (image) => {
        if(image) {
            return (<img src={image}/>)
        }
        else {
            return (<span>No image</span>)
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append('file', image);

        axiosPrivate.post('/books/upload_cover', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(resp => {
            setFilepath(resp.data.filename);
            setImagePreview('/images/' + resp.data.filename);
            setHasImage(true);
        })
        .catch(err => {
            if(err === 'Unauthorized')
            {
                navigate('/login')
            }
        })
    }

    const handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () =>{
            setImage(file);
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleCancelImage = (e) => {
        setImage('');
        setImagePreview('');
    }

    const handleDeleteImage = (e) => {
        e.preventDefault();
        axiosPrivate.delete('/books/images/'+filepath)
        .then((res) => {
            setImage('');
            setImagePreview('');
            setHasImage(false);
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    const currentForm =()=> {
        if(imagePreview === '') {
            return(
                <form encType='multipart/form-data' onSubmit={handleUpload}>
                    <label className="input_image_label">
                        <span>Choose image</span>
                        <input type='file' onChange={handleImageChange} accept="image/png, image/jpeg" hidden/>
                    </label>
                </form>
            )
        } else {
            if(('/images/'+ filepath) === imagePreview) {
                return (
                    <button onClick={handleDeleteImage}>Delete</button>
                )
            } else {
                return (
                    <form encType='multipart/form-data' onSubmit={handleUpload}>
                    <label className="input_image_label">
                        <span>Choose image</span>
                        <input type='file' onChange={handleImageChange} accept="image/png, image/jpeg" hidden/>
                    </label>
                    <button onClick={handleCancelImage}>Cancel</button>
                    <input type='submit' value='Set as image'/>
                </form>
                )
            }
        }
    }

    return (
        <div>
        <div className='book-list-image'>
        { 
            preview(imagePreview)
        }
        </div>
        {
            currentForm()
        }
        </div>
    )
}
export default ImageUploadComponent;