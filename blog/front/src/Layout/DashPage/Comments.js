import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from "../../css/Dashboard.module.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdReadMore } from 'react-icons/md';

function Comments () {
    const [ comments, setComments ] = useState(null)
    const [ error, setError ] = useState({
        server: ""
    })

    useEffect(() => {
        const getComments = async () => {
            const res = await fetch("http://localhost:4000/post/")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ server: data.error }))
            } else {
                json.then(data => setComments(data))
            }
        }
        getComments()
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
            <h2>Comments Lists</h2>
            <table className={css.table}>
                <tr>
                    <th>No</th>
                    <th>post</th>
                    <th>Comment</th>
                    <th>Likes</th>
                    <th colSpan={'3'}>Actions</th>
                </tr>
                {comments && comments.map((post, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{post.title}</td>
                        <td>{post.summary}</td>
                        <td style={{ cursor: "pointer" }}><p><MdReadMore style={{ color: "green", fontSize: "1.1rem" }} />Read</p></td>
                        <td style={{ cursor: "pointer" }}><p><MdDelete style={{ color: "red" }} />Delete</p> </td>
                        <td style={{ cursor: "pointer" }}><p><FaEdit style={{ color: "tomato" }} />Edit</p></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Comments