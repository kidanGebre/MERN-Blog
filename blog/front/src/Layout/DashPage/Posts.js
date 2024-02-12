import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from "../../css/Dashboard.module.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdReadMore } from 'react-icons/md';
import { userContext } from '../../context/userContext';
import Deleteplate from '../../UI/Deleteplate';

function Posts () {
    const { user } = useContext(userContext)
    const [ posts, setPosts ] = useState(null)
    const [ deletePost, setDeletePost ] = useState(false)
    const [ postDelete, setPostDelete ] = useState(null)
    const [ error, setError ] = useState({
        server: ""
    })

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch("http://localhost:4000/post/")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ server: data.error }))
            } else {
                json.then(data => setPosts(data))
            }
        }
        getPosts()
    }, []);

    const handlePostDelete = (post) => {
        setDeletePost(true)
        setPostDelete(post)
    }

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
                    <th>Title</th>
                    <th>Summary</th>
                    <th>catagory</th>
                    <th>Author</th>
                    <th>Like</th>
                    <th>View</th>
                    <th colSpan={'3'}>Actions</th>
                </tr>
                {error.server && <p className='error'>{error.server}</p>}
                {posts && posts.map((post, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><Link to={`/blog/detail/${post._id}`}>{post.title}</Link></td>
                        <td>{post.summary}</td>
                        <td>{post.catagory}</td>
                        <td>{post.author.name}</td>
                        <td>{post.like.length}</td>
                        <td>{post.view}</td>
                        <td style={{ cursor: "pointer" }}><p><MdReadMore style={{ color: "green", fontSize: "1.1rem" }} /><Link to={`/blog/detail/${post._id}`}>Read</Link></p></td>
                        <td style={{ cursor: "pointer" }} onClick={() => handlePostDelete(post)}><p><MdDelete style={{ color: "red" }} />Delete</p></td>
                        {user.id === post.author._id && <td style={{ cursor: "pointer" }}><p><FaEdit style={{ color: "tomato" }} /><Link to={`/editpost/${post._id}`}>Edit</Link></p></td>}
                    </tr>
                ))}
            </table>
            {deletePost && postDelete && <Deleteplate post={postDelete} />}
        </div>
    )
}

export default Posts