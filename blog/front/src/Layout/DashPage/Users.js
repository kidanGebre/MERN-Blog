import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from "../../css/Dashboard.module.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';

function Users () {
    const [ users, setUsers ] = useState(null)
    const [ error, setError ] = useState({
        server: ""
    })

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch("http://localhost:4000/user/")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ server: data.error }))
            } else {
                json.then(data => setUsers(data))
            }
        }
        getPosts()
    }, []);

    return (
        <div className={css.posts} style={{ boxSizing: "border-box" }}>
            <div className={css.searchBox}>
                <div className={css.searchContainer}>
                    <form>
                        <input type="search" name="" id="" />
                        <button type='submit'>Search</button>
                    </form>
                </div>
                <Link to="/createpost">Create new post</Link>
            </div>
            <h2>Post Lists</h2>
            <table className={css.table}>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th colSpan={'2'}>Actions</th>
                </tr>
                {users && users.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role === "1" ? "Admin" : user.role === "2" ? "Editor" : "Member"}</td>
                        <td style={{ cursor: "pointer" }}><p><MdDelete style={{ color: "red" }} />Delete</p> </td>
                        <td style={{ cursor: "pointer" }}><p><FaEdit style={{ color: "tomato" }} />Edit</p></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Users