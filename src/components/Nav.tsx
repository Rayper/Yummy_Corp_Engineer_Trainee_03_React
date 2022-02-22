import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../Nav.css';

// cara dengan stateful components
const Nav = () => {
        const [user, setUser] = useState({
          first_name: ''
        });
        // pakai useEffect karena tidak bisa menggunakan axios
        // maksudnya [] adalah useEfect hanya diapnggil 1x
        // tambahkan credentials true untuk menjadi authenticated user
        useEffect(() => {
          // cara pertama
            // const getUser = async () => {
            //     const {data} = await axios.get('http://localhost:8000/user');
            // }

            // getUser();
            // cara kedua pakai anonymous function
            (
              async () => {
                const {data} = await axios.get('http://localhost:8000/api/user');

                setUser(data);
                }
            )();
        },[]);
        
        const logout = async () => {
            await axios.post('logout', {});
        }

        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
              <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Yummy Engineer Trainee</a>

                <ul className="my-2 my-md-0 mr-md-3">
                  <Link to="/profile" className="p2 text-white text-decoration-none">Welcome {user?.first_name}</Link>
                  <Link to="/login" className="p2 text-white text-decoration-none"
                  onClick={logout}
                  >Logout</Link>
                </ul>
          </nav>
        )
}

export default Nav;