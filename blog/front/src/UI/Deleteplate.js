import React, { useEffect, useState } from 'react'
import Card from './Card'
import { format } from 'date-fns'
import { Link, Navigate } from 'react-router-dom'
import css from './Deleteplate.module.css'


function Deleteplate ({ post }) {
    const [ redirect, setRedirect ] = useState(false)

    const handelDelete = async () => {
        const response = await fetch(`http://localhost:4000/post/delete/${post._id}`,
            { method: "POST" }
        )
        if(response.ok) {
            setRedirect(true)
        }
    }

    if(redirect) {
        return <Navigate to={'/blog'} />
    }

    return (
        <Card>
            <div className={css.post}>
                {
                    post &&
                    <><div className={css.newpost}>
                        <Link to={`detail/${post._id}`}>
                            <img className={css.postcover} src={`http://localhost:4000/uploads/${post.cover}`} alt="post banner" />
                        </Link>
                        <div className={css.titlePart}>
                            <div className={css.catagory}>
                                <p>{post.catagory}</p>
                                <small>{format(new Date(post.createdAt), "MMM dd, yyyy")}</small>
                            </div>
                            <Link to={`detail/${post._id}`}>{post.title}</Link>
                        </div>
                    </div>
                        <p style={{ color: "yellow", padding: "0.5rem" }}>Do you want to delete this post</p>
                        <button className='button' style={{ backgroundColor: "red" }} onClick={handelDelete}> Delete</button>
                    </>
                }

            </div>
        </Card>
    )
}

export default Deleteplate