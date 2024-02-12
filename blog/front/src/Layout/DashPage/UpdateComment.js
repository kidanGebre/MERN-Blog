import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import css from "../../css/Dashboard.module.css"
import { Navigate } from "react-router-dom"
import Card from '../../UI/Card'

function UpdateComment ({ comment, setLoader, loader, id }) {
    const [ error, setError ] = useState({ server: "", empty: "" })
    const [ redirect, setRedirect ] = useState(false)
    const [ newComment, setNewComment ] = useState('')

    useEffect(() => {
        setNewComment(comment.comment)
    }, [ comment ])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newComment === "") {
            setError({ empty: "All fields are required" })
        }
        const response = await fetch(`http://localhost:4000/comment/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({ newComment }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(response.ok) {
            setRedirect(true)
            setLoader(!loader)

        } else {
            response.json().then(data => setError({ server: data.error }))
        }

    }

    if(redirect) {
        return <Navigate to={`/blog/detail/${id}`} />
    }

    return (
        <Card>
            <div className={css.c_post_cont}>
                <h2>Edit comment</h2>
                <form onSubmit={handleSubmit}>
                    {error.server && <p>{error.server}</p>}
                    {error.empty && <p>{error.empty}</p>}

                    <label>Comment:</label>
                    <textarea
                        className='textarea'
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        cols="30"
                        rows="5">
                    </textarea>
                    <button type='submit' className='button'>Edit</button>
                </form>
            </div>
        </Card>
    )
}

export default UpdateComment