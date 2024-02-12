import React, { useState } from 'react'
import Card from './Card'
import { Navigate } from 'react-router-dom'
import css from './Deleteplate.module.css'


function DeleteReply ({ reply, setLoader, loader, id }) {
    const [ redirect, setRedirect ] = useState(false)

    const handelDelete = async () => {
        const response = await fetch(`http://localhost:4000/comment/reply/delete/${reply._id}`,
            { method: "POST" }
        )
        if(response.ok) {
            setLoader(!loader)
            setRedirect(true)
        }
    }

    if(redirect) {
        return <Navigate to={`/blog/detail/${id}`} />
    }

    return (
        <Card>
            <div className={css.post}>
                {
                    reply &&
                    <>
                        <div className={css.newpost}>
                            <p>{reply.reply}</p>
                        </div>
                        <p style={{ color: "yellow", padding: "0.5rem" }}>Do you want to delete this reply</p>
                        <button className='button' style={{ backgroundColor: "red" }} onClick={handelDelete}> Delete</button>
                    </>
                }

            </div>
        </Card>
    )
}

export default DeleteReply