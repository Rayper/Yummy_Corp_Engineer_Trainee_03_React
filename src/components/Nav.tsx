import axios from "axios";
import React, { Dispatch, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import '../Nav.css';
import { setUser } from "../pages/redux/actions/setUserAction";
import { connect } from "react-redux";

// cara dengan stateful components
const Nav = (props: {user: User}) => {
        // const [user, setUser] = useState(new User());
        // pakai useEffect karena tidak bisa menggunakan axios
        // maksudnya [] adalah useEfect hanya diapnggil 1x
        // tambahkan credentials true untuk menjadi authenticated user
        // useEffect(() => {
        //   // cara pertama
        //     // const getUser = async () => {
        //     //     const {data} = await axios.get('http://localhost:8000/user');
        //     // }

        //     // getUser();
        //     // cara kedua pakai anonymous function
        //     (
        //       async () => {
        //         const {data} = await axios.get('http://localhost:8000/api/user');

        //         // ambil data dari properties user yang sudah dibut di folder Models
        //         // pastikan kalau mau pake function di dalam class User, harus pake keyword new 
        //         setUser(new User(
        //           data.id,
        //           data.first_name,
        //           data.last_name,
        //           data.email,
        //           data.role
        //         ));
        //         }
        //     )();
        // },[]);
        
        const logout = async () => {
            await axios.post('logout', {});
        }

        return (
            <nav className="navbar sticky-top flex-md-nowrap p-0 shadow">
              <Link to='/' className="navbar-brand col-md-3 col-lg-2 mr-0 px-3">Yummy Engineer Trainee</Link>

                <ul className="my-2 my-md-0 mr-md-3">
                  <Link to="/profile" className="p2 text-white text-decoration-none">Welcome {props.user.name}</Link>
                  <Link to="/login" className="p2 text-white text-decoration-none" onClick={logout} >Sign out</Link>
                </ul>
          </nav>
        )
}

const mapStateToProps = (state: { user: User }) => {
  return {
      user: state.user
  };
}
// mapDispatchToProps => mengirim event ke component yang lain
// lalu kita dispatch melalui function ini
// Untuk merubah state hanya bisa dilakukan di Reducer
// Reducer hanya melakukan perubahan state jika ada action yang di dispatch() .

export default connect(mapStateToProps)(Nav);
