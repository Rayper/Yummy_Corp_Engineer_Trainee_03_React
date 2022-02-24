import axios from "axios";
import React, { Component, Dispatch, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Menu from "./Menu";
import Nav from "./Nav";
import { connect } from "react-redux";
import { User } from "../models/user";
import { setUser } from "../pages/redux/actions/setUserAction";

// define dengan any
const Wrapper = (props: any) => {
        const [redirect, setRedirect] = useState(false);

        useEffect(() => {
            (
                async () => {
                    try {
                        const {data} = await axios.get('user');

                        // panggil function setUser disini
                        props.setUser(new User(
                            data.id,
                            data.first_name,
                            data.last_name,
                            data.email,
                            data.role
                          ));

                    } catch (error) {
                        setRedirect(true);
                    }
                }
            )();
        },[]);

        if(redirect) {
            return <Redirect to="/login" />
        }

        return(
            <>
                <Nav />

                <div className="container-fluid">

                    <div className="row">

                        <Menu />

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {props.children}
                        </main>
                    </div>
                </div>
            </>
        )
}

// connect menerima 2 function

// mapStateToProps => dimana kita menerima sebuah event dari component2 yang ada
// kita mendapatkan user melalui state
const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

// mapDispatchToProps => mengirim event ke component yang lain
// lalu kita dispatch melalui function ini
// Untuk merubah state hanya bisa dilakukan di Reducer
// Reducer hanya melakukan perubahan state jika ada action yang di dispatch() .
const mapDispatchToProps = ( dispatch: Dispatch<any> ) => {
    return {
        // setUser function yang didapat dari redux ( setUserAction )
        setUser: (user: User) => dispatch(setUser(user))  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);