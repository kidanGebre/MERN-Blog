import React, { useState } from 'react'
import css from "../css/Login.module.css"
import { Navigate } from 'react-router-dom'

function Register () {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState("")
    const [ file, setFile ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ cpassword, setCPassword ] = useState("")
    const [ redirect, setRedirect ] = useState(false)
    const [ error, setError ] = useState({
        email: "",
        password: "",
        server: "",
        name: "",
        cpassword: "",
        file: ""
    })

    const HandleSubmit = async (e) => {
        const data = new FormData()
        data.set('name', name)
        data.set('email', email)
        data.set('password', password)
        data.set('file', file[ 0 ])
        e.preventDefault()

        if(!file) {
            setError({ file: "Please choose picture" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            setError({ email: 'Invalid email format' });
            return;
        }

        if(password.length > 7) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
            if(!passwordRegex.test(password)) {
                setError({ password: 'Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 number' });
                return;
            }
        } else {
            setError({ password: 'Password length must greater than 7' });
        }
        if(password !== cpassword) {
            setError({ cpassword: "The password is not the same" })
            return;
        }

        const response = await fetch("http://localhost:4000/user/register", {
            method: "POST",
            body: data
        })

        if(!response.ok) {
            response.json().then(data => setError({ server: data.error }))
        } else {
            setRedirect(true)
        }

        setError({
            email: "",
            password: "",
            server: "",
            name: "",
            cpassword: "",
            file: ""
        })
    }
    if(redirect) {
        return <Navigate to={"/login"} />
    }
    return (
        <div className={css.Login_Container}>
            <div className={css.Login}>
                <h2>Register</h2>
                <form onSubmit={HandleSubmit}>
                    <label>Name:</label>
                    <input className='input' type="text" value={name} onChange={e => setName(e.target.value)} />
                    {error?.name && <small className='error'>{error.name}</small>}

                    <label>Email:</label>
                    <input className='input' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {error?.email && <small className='error'>{error.email}</small>}

                    <label>Profile:</label>
                    <input className='input' type="file" onChange={e => setFile(e.target.files)} />
                    {error?.file && <small className='error'>{error.file}</small>}

                    <label>Password:</label>
                    <input className='input' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {error?.password && <small className='error'>{error.password}</small>}
                    <label>Confirm-password:</label>
                    <input className='input' type="password" value={cpassword} onChange={e => setCPassword(e.target.value)} />
                    {error?.cpassword && <small className='error'>{error.cpassword}</small>}
                    {error?.server && <small className='error'>{error.server}</small>}

                    <button type='submit' className='button'>Signup</button>
                </form>
            </div>

        </div>
    )
}

export default Register