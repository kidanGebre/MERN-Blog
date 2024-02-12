import React, { useContext, useState } from 'react'
import css from "../css/Login.module.css"
import { userContext } from '../context/userContext'
import { Navigate } from 'react-router-dom'

function Login () {
    const { setUser } = useContext(userContext)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ redirect, setRedirect ] = useState(false)
    const [ error, setError ] = useState({
        email: "",
        password: "",
        server: ""
    })

    const HandleSubmit = async (e) => {
        e.preventDefault()

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

        const response = await fetch("http://localhost:4000/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        if(!response.ok) {
            response.json().then(data => setError({ server: data.error }))
        } else {
            const data = await fetch("http://localhost:4000/user/loggedUser", {
                credentials: "include"
            })
            if(data) {
                data.json().then(user => setUser(user))
                setRedirect(true)
            } else {
                data.json().then(data => setError({ server: data.error }))
            }
        }

        setError({
            email: "",
            password: "",
            server: ""
        })
    }
    if(redirect) {
        return <Navigate to={"/"} />
    }
    return (
        <div className={css.Login_Container}>
            <div className={css.Login}>
                <h2>Login</h2>
                <form onSubmit={HandleSubmit}>
                    <label>Email:</label>
                    <input className='input' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    {error?.email && <small className='error'>{error.email}</small>}
                    <label>Password:</label>
                    <input className='input' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {error?.password && <small className='error'>{error.password}</small>}
                    {error?.server && <small className='error'>{error.server}</small>}

                    <button type='submit' className='button'>Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login