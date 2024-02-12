import React, { useState } from 'react'
import Card from './Card'
import { Navigate } from 'react-router-dom'
import css from './Deleteplate.module.css'


function DeleteComment ({ comment, setLoader, loader, id }) {
    const [ redirect, setRedirect ] = useState(false)

    const handelDelete = async () => {
        const response = await fetch(`http://localhost:4000/comment/delete/${comment._id}`,
            { method: "POST" }
        )
        if(response.ok) {
            setRedirect(true)
            setLoader(!loader)

        }
    }

    if(redirect) {
        return <Navigate to={`/blog/detail/${id}`} />
    }

    return (
        <Card>
            <div className={css.post}>
                {
                    comment &&
                    <>
                        <div className={css.newpost}>
                            <p>{comment.comment}</p>
                        </div>
                        <p style={{ color: "yellow", padding: "0.5rem" }}>Do you want to delete this comment</p>
                        <button className='button' style={{ backgroundColor: "red" }} onClick={handelDelete}> Delete</button>
                    </>
                }

            </div>
        </Card>
    )
}

export default DeleteComment