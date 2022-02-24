import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import UploadImage from '../../components/UploadImage';
import Wrapper from '../../components/Wrapper';

const CreateProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('products', {
            title,
            description,
            image,
            price
        });
        
        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to="/products" />
    }

    return (
        <Wrapper>

            <br></br>
            <h1>Create Products Page</h1>
            <br></br>

            <form onSubmit={submit}> 
                <div className='mb-3'>
                    <label>Title</label>
                    <input className='form-control' onChange={e => setTitle(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label>Description</label>
                    <textarea className='form-control' onChange={e => setDescription(e.target.value)}></textarea>
                </div>

                <div className='mb-3'>
                    <label>Image</label>
                    <div className='input-group'>
                        <input className='form-control'
                        value={image} 
                        onChange={e => setImage(e.target.value)} />
                        <UploadImage uploaded={setImage}/>
                    </div>
                </div>

                <div className='mb-3'>
                    <label>Price</label>
                    <input type="number" className='form-control' onChange={e => setPrice(e.target.value)}/>
                </div>

                <button className='btn btn-primary'>Save</button>
            </form>
        </Wrapper>
    );
};

export default CreateProduct;