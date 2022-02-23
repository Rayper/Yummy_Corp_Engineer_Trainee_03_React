import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../Login.css';

// membuat komponen dengan cara react hooks/stateless
const Login = () => {

    // setState untuk check email
    const[email, setEmail] = useState('');
    // setState untuk check password
    const[password, setPassword] = useState('');
    // setState untuk redirect menjadi true setelah login berhasil
    const[redirect, setRedirect] = useState(false);

    // bedanya kalau diregister, di tag form gaperlu this.submit, karena itu untuk class component
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // karena saat post kita kirim email dan password dan dapat cookie, untuk itu tambahkan option withCredentials
        await axios.post('login', {
            email,
            password
        });

        // console.log(data);

        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to={'/'}/>;
    }

    return (
        <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="login-title">Sign In Page</h1>

                <div className='mb-2'>
                    <input type="email" className="form-control" placeholder="Email" required 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-2'>
                    <input type="password" className="form-control" placeholder="Password" required 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
 
                    <button className="w-75 btn-login btn-lg btn-primary" type="submit">Login</button>
                </form>
        </main>
    );
};

export default Login;