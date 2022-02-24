import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';

const Profile = () => {
    const [first_name,setFirstName] = useState('')
    const [last_name,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('user');

                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
            }
        )()
    }, [])

    const info_submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('users/updateInfo', {
            first_name,
            last_name,
            email
        });

    }

    const password_submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('users/updatePassword', {
            password,
            passwordConfirm
        })
    }
    
    return (
        <Wrapper>
            <h3>Account Information</h3>
            <form onSubmit={info_submit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control"
                        defaultValue={first_name}
                        onChange={e => setFirstName(e.target.value)} 
                        />
                </div>

                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control"
                        defaultValue={last_name}
                        onChange={e => setLastName(e.target.value)} 
                        />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)} 
                        />
                </div>

                <button className="btn btn-lg btn-primary" type="submit">Save</button>
            </form>

            <h3 className='mt-4'>Change Password</h3>
            <form onSubmit={password_submit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        onChange={e => setPassword(e.target.value)} 
                        />
                </div>

                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control"
                        onChange={e => setPasswordConfirm(e.target.value)} 
                        />
                </div>

                <button className="btn btn-lg btn-primary" type="submit">Save</button>
            </form>

        </Wrapper>
    );
};

export default Profile;