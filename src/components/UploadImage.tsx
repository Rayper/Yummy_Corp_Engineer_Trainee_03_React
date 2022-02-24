import axios from 'axios';
import React from 'react';

const UploadImage = (props: { uploaded: (url: string) => void }) => {
    // function untuk upload, harus ada sec value yaitu null
    const upload = async (files: FileList | null) => {
        // jika file kosong, jgn return apa2
        if(files === null) return;

        // untuk passing image / filesnya
        const formData = new FormData();
        // append image menjadi array of files, karena akan ada banyak images
        formData.append('image', files[0]);

        const {data} = await axios.post('upload', formData);

        // assign url image-nya
        props.uploaded(data.url);
    }

    return (
        <label className='btn btn-primary'>
            Upload <input type="file" hidden onChange={e => upload(e.target.files)}/>
        </label>
    );
};

export default UploadImage;