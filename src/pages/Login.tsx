import React, { useState } from 'react';

// membuat komponen dengan cara react hooks/stateless
const Login = () => {

    // sama seperti 
    // state = {
    //   redirect: false
    // };

    // [variable, sebuah function untuk ubah variable tersebut]
    // variable-nya bersifat immutable = tidak dapat dirubah
    // set initial value useState dari 0
    // kita menggunakan useState ketika akan merefresh dan merender ulang html 
    const [count, setCount] = useState(0);

    return (
        <div className="container"> 
           <h1>Count {count}</h1>
           {/* input untuk merubah count */}
           {/* harus parseInt karena default type dari e.target.value itu biasanya string */}
           <input type="number" onChange={e => setCount(parseInt(e.target.value))}></input> 
        </div>
    );
};

export default Login;