import axios from 'axios';
import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from './redux/actions/setUserAction';

// buat parameter untuk setUser
const Profile = (props: { user: User, setUser: (user: User) => void }) => {
    const [first_name,setFirstName] = useState('')
    const [last_name,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')

    useEffect(() => {
        // (
            // async () => {
            //     const {data} = await axios.get('user');
                setFirstName(props.user.first_name);
                setLastName(props.user.last_name);
                setEmail(props.user.email);
            // }
        // )()
        // setiap kali get user, maka akan manggi dependency props.user ini
    }, [props.user]);

    const info_submit = async (e: SyntheticEvent) => {
        e.preventDefault();


        // ubah disini karena menggunakan redux jadi buat variable data untuk send perubahan
        const {data} = await axios.put('users/updateInfo', {
            first_name,
            last_name,
            email
        });

        // harus mengirimkan data barunya dalam bentuk object karena ketika mendapatkan name, name tersebut berupa function
        props.setUser(new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
          ));
    }

    const password_submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('users/updatePassword', {
            password,
            passwordConfirm
        });
        
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

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
  }

const mapDispatchToProps = ( dispatch: Dispatch<any> ) => {
    return {
        // setUser function yang didapat dari redux ( setUserAction )
        setUser: (user: User) => dispatch(setUser(user))  
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Profile);
