import axios from 'axios';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import UploadImage from '../../components/UploadImage';
import Wrapper from '../../components/Wrapper';

const UpdateProduct = (props: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);
    // useRef mirip seperti useState, tapi dia tidak meng-update html
    // useRef mengembalikan sebuah obyek mutable ref (obyek yang mungkin dapat berubah) dimana properti .Current diinisialisasi 
    //  ke argumen yang dioper ( initialValue )
    // initialize useRef dgn null
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products/${props.match.params.id}`);

                // dapetin data-nya per variable
                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);
            }
        )()
    },[]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`products/${props.match.params.id}`, {
            title,
            description,
            image,
            price
        });
        
        setRedirect(true);
    }

    // kasi parameter url untuk image
    const updateImage = (url: string) => {
        // kasih kondisi, karena kita initialize useRef null
        if(ref.current) {
            ref.current.value = url;
        }
        // setImage dari url image yang sudah diupdate
        setImage(url);
    }

    if(redirect) {
        return <Redirect to="/products" />
    }

    return (
        <Wrapper>

            <br></br>
            <h1>Update Products Page</h1>
            <br></br>

            <form onSubmit={submit}> 
                <div className='mb-3'>
                    <label>Title</label>
                    <input className='form-control' 
                        defaultValue={title}                    
                        onChange={e => setTitle(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label>Description</label>
                    <textarea className='form-control' 
                        defaultValue={description}
                        onChange={e => setDescription(e.target.value)}>
                    </textarea>
                </div>

                <div className='mb-3'>
                    <label>Image</label>
                    <div className='input-group'>
                        <input className='form-control'
                            ref={ref}
                            defaultValue={image} 
                            onChange={e => setImage(e.target.value)} />
                        <UploadImage uploaded={updateImage}/>
                    </div>
                </div>

                <div className='mb-3'>
                    <label>Price</label>
                    <input type="number" className='form-control' 
                        defaultValue={price}
                        onChange={e => setPrice(e.target.value)}/>
                </div>

                <button className='btn btn-primary'>Save</button>
            </form>
        </Wrapper>
    );
};

export default UpdateProduct;