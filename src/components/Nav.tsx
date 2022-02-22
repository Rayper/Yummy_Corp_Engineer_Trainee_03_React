import axios from "axios";
import React, { useEffect, useState } from "react";

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

        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
              <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Yummy Engineer Trainee</a>

                <ul className="my-2 my-md-0 mr-md-3">
                  <a className="p4 text-white text-decoration-none">Welcome, {user?.first_name} |  </a>
                  <a className="p4 text-white text-decoration-none" href="#">Logout</a>
                </ul>
          </nav>
        )
}

export default Nav;