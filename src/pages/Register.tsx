import React, { Component, SyntheticEvent } from "react";
import '../Login.css';
import axios from "axios";
import { Redirect } from "react-router-dom";

class Register extends Component {

    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';
    state = {
        redirect: false
    };

    // e: SyntheticEvent -> event supaya bisa prevent default behaviour (submit langsung refresh)
    submit = async (e: SyntheticEvent) => {
        // untuk prevent default behaviour
        e.preventDefault();

        // masukin ke backend yang udah dibuat
        await axios.post('http://localhost:8000/api/register', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm,
        });

        // print hasil inputan
        // console.log(response);

        // set state untuk redirect jadi true setelah register
        this.setState({
            redirect: true
        });
    }

    render() {

        // cek kondisi untuk sebelum login, jika true maka akan ke page login
        if(this.state.redirect) {
            return <Redirect to={'/login'} />;
        }

        return(
            <>
            <main className="form-signin">
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Register Page</h1>

                    <input type="text" className="form-control" placeholder="First Name" required 
                        onChange={e => this.first_name = e.target.value}
                    />

                    <input type="text" className="form-control" placeholder="Last Name" required
                        onChange={e => this.last_name = e.target.value}
                    />

                    <input type="email" className="form-control" placeholder="Email" required
                        onChange={e => this.email = e.target.value}
                    />

                    <input type="password" className="form-control" placeholder="Password" required 
                        onChange={e => this.password = e.target.value}
                    />

                    <input type="password" className="form-control" placeholder="Password Confirm" required 
                        onChange={e => this.password_confirm = e.target.value}
                    />
 
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>  
            </>
        )
    }
}

export default Register;