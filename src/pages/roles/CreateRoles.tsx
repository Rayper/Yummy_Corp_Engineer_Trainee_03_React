import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Permission } from '../../models/permission';

const CreateRoles = () => {
    // useState untuk permissions
    const [permissions, SetPermissions] = useState([]);
    // useState untuk selected permissions, sebagai array number karena banyak id yg dipilih
    const [selected, setSelected] = useState([] as number[]);
    // useState untuk name role-nya
    const [name, setName] = useState('');

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('permissions');

                SetPermissions(data);
            }
        )();
    }, []);

    const check = (id: number) => {
        // cara pertama
        // some akan ngecek selected id yang dipilih
        if(selected.some(s => s === id)){
            // loop untuk ngecek selected id, lalu remove dan siap untuk dimasukan ke dalam array number 
            setSelected(selected.filter(s => s !== id));
            return;
        }
        // add selected id ke array number
        setSelected([...selected, id]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('roles', {
            name, 
            // permissions akan push oleh value selected ( beberapa permissions id )
            permissions: selected
        });

        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to='/roles' />
    }

    return (
        <Wrapper>

            <br></br>
            <h1>Create Roles Page</h1>
            <br></br>

            <form onSubmit={submit}>
                <div className='mb-3 mt-3 row'>
                    <label className='col-sm-2 col-form-label'>Name</label>
                    <div className='col-sm-10'>
                        <input className='form-control' onChange={e => setName(e.target.value)}/>
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label className='col-sm-2 col-form-label'>Permissions</label>
                    <div className='col-sm-10'>
                        {permissions.map((p: Permission) => {
                            return (
                                <div className='form-check form-check-inline col-3' key={p.id}>
                                    <input type="checkbox" className='form-check-input' 
                                        value={p.id}
                                        onChange={() => check(p.id)}
                                    />
                                    <label className='form-check-label'>{p.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button className='btn btn-primary'>Save</button>
            </form>
        </Wrapper>
    );
};

export default CreateRoles;