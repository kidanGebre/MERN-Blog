import React, { useState, useEffect, useContext } from 'react'
import { useLocation, NavLink, Navigate } from 'react-router-dom'
import css from "../css/Dashboard.module.css"
import { FaComment, FaUser } from 'react-icons/fa'
import { BsFilePostFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoLogOutSharp } from "react-icons/io5";
import ProfilePage from './DashPage/ProfilePage';
import { userContext } from '../context/userContext';
import { transformFullName } from '../UI/transformFullName';
import DashHome from './DashPage/DashHome';
import Posts from './DashPage/Posts';
import Users from './DashPage/Users';
import Comments from './DashPage/Comments';


function Dashboard () {
    const location = useLocation()
    const [ tab, setTab ] = useState("")
    const { user, setUser } = useContext(userContext)


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const getUrl = urlParams.get('tab')
        setTab(getUrl)
    }, [ location.search ])

   /* const NavLinkStyle = ({ isActive }) => {
        if(isActive) {
            return { color: "var(--button)" }
        }
    }*/

    const Logout = () => {
        const res = fetch("http://localhost:4000/user/logout", { method: "POST", credentials: "include" })
        if(res) {
            setUser("")
            return < Navigate to='/' />
        }
    }

    return (
        <>
            {user.role === "1" || user.role === "2" ?
                (<div className={css.dash_container}>
                    <div className={css.left_dash}>
                        <NavLink className={tab === "dash" ? 'dash' : ""} to={'/dashboard?tab=dash'}><MdDashboard /> Dashboard</NavLink>
                        <NavLink className={tab === "profile" ? 'dash' : ""} to={'/dashboard?tab=profile'}><FaUser /> {transformFullName(user.name)}</NavLink>
                        <NavLink className={tab === "comments" ? 'dash' : ""} to={'/dashboard?tab=comments'}><FaComment /> Comments</NavLink>
                        <NavLink className={tab === "posts" ? 'dash' : ""} to={'/dashboard?tab=posts'}><BsFilePostFill /> Posts</NavLink>
                        <NavLink className={tab === "users" ? 'dash' : ""} to={'/dashboard?tab=users'}><ImUsers /> Users</NavLink>
                        <li onClick={Logout} className={css.logout} ><IoLogOutSharp /> Logout</li>
                    </div>
                    <div className={css.right_dash}>
                        {tab === "dash" && <DashHome />}
                        {tab === "profile" && <ProfilePage />}
                        {tab === "posts" && <Posts />}
                        {tab === "users" && <Users />}
                        {tab === "comments" && <Comments />}
                    </div>
                </div >)
                : <Navigate to={'/login'} />
            }
        </>
    )
}

export default Dashboard