import React, { useContext, useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import css from "../css/header.module.css"
import { userContext } from '../context/userContext';

function Header () {
    const [ menu, setMenu ] = useState(false)
    const { user, setUser } = useContext(userContext)
    const [ onDash, setOnDash ] = useState(false)

    useEffect(() => {
        const findUser = async () => {
            const response = await fetch("http://localhost:4000/user/loggedUser", { credentials: "include" })
            if(response.ok) {
                response.json().then(data => setUser(data))
            }

        }
        findUser()
    }, [])
    const HandleMenu = () => {
        setMenu(!menu)
    }
    const showDash = () => {
        setOnDash(!onDash)
    }
    const NavLinkStyle = ({ isActive }) => {
        if(isActive) {
            return { color: "var(--button)" }
        }
    }
    const Logout = () => {
        const res = fetch("http://localhost:4000/user/logout", { method: "POST", credentials: "include" })
        if(res) {
            setUser("")
            setOnDash(false)
        }
    }

    return (
        <div className={css.Header_container}>
            <div className={css.Header}>
                <Link to='/' className={css.logo} onClick={HandleMenu}><span>Dema</span>sqo</Link>
                <div className={css.navbar}>
                    <NavLink style={NavLinkStyle} to={'/blog'}>Blog</NavLink>
                    <NavLink style={NavLinkStyle} to={'/about'}>About</NavLink>
                    <NavLink style={NavLinkStyle} to={'/contact'}>Contact</NavLink>
                    {!user && <>
                        <NavLink style={NavLinkStyle} to={'/login'}>Login</NavLink>
                        <NavLink style={NavLinkStyle} to={'/signup'}>Signup</NavLink>
                    </>}
                    {user && <div className={css.dashboard_Container}>
                        <img onClick={showDash} className={css.name} src={`http://localhost:4000/uploads/${user.profile}`} alt="user profile" />
                        {onDash && <ul>
                            {user.role !== "0" && <Link onClick={showDash} to="/dashboard?tab=profile">Dashboard</Link>}
                            <li onClick={Logout} className={css.logout}>Logout</li>
                        </ul>}
                    </div>}
                </div>
                <div className={css.menu} onClick={HandleMenu} ><IoMenu /></div>
                {menu && <div className={css.mobilenavbar}>
                    <NavLink onClick={HandleMenu} style={NavLinkStyle} to={'/blog'}>Blog</NavLink>
                    <NavLink onClick={HandleMenu} style={NavLinkStyle} to={'/about'}>About</NavLink>
                    <NavLink onClick={HandleMenu} style={NavLinkStyle} to={'/contact'}>Contact</NavLink>
                    {!user && <>
                        <NavLink onClick={HandleMenu} style={NavLinkStyle} to={'/login'}>Login</NavLink>
                        <NavLink onClick={HandleMenu} style={NavLinkStyle} to={'/signup'}>Signup</NavLink>
                    </>}
                    {user && <NavLink style={NavLinkStyle} className={css.logout}>{user.name}</NavLink>}
                </div>}

            </div>
        </div>
    )
}

export default Header