import React, { useState, useEffect } from 'react'
import css from '../css/Detailpost.module.css'
import { FcLike } from "react-icons/fc";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import DeleteReply from '../UI/DeleteReply';
import UpdateReply from './DashPage/UpdateReply';

function Reply ({ commentId, loader, setLoader, id, user }) {
    const [ replies, setReplies ] = useState(null)
    const [ deleteReply, setDeleteReply ] = useState(false)
    const [ getReply, setGetReply ] = useState('')
    const [ editReply, setEditReply ] = useState(false)

    //get replies
    useEffect(() => {
        const getReply = async () => {
            const response = await fetch(`http://localhost:4000/comment/reply/${commentId}`)
            const json = response.json()
            if(response.ok) {
                json.then(data => setReplies(data))
            }
        }
        getReply()
    }, [ loader ])

    const handleDelete = (reply) => {
        setDeleteReply(true)
        setGetReply(reply)
    }

    const handleReplyEdit = (reply) => {
        setEditReply(true)
        setGetReply(reply)

    }

    return (
        <>
            {replies && replies.map(
                (reply, index) => (
                    <div style={{ border: "1px solid var(--textTitle)", padding: "0.5rem", borderRadius: "0.5rem", marginTop: "1rem" }} key={index} className={css.reply}>
                        <div className={css.comment_creator}>
                            <img src={`http://localhost:4000/uploads/${reply.author.profile}`} alt='profile picture of user' />
                            <div>
                                <h4>{reply.author.name}</h4>
                                <p>{reply.author.role === "1" ? "Admin" : reply.author.role === "2" ? "Editor" : "Member"}</p>
                            </div>
                        </div>
                        <p className={css.content}>{reply.reply}</p>
                        <div className={"interaction"}>
                            <div className={"like"}><span>12</span><FcLike /></div>
                            {user.id === reply.author._id &&
                                <>
                                    <div className={"edit"} onClick={() => handleReplyEdit(reply)}><FaEdit /></div>
                                    <div className={"delete"} onClick={() => handleDelete(reply)}><RiDeleteBin5Fill /></div>
                                </>
                            }
                        </div>
                        {deleteReply && <DeleteReply reply={getReply} setLoader={setLoader} loader={loader} id={id} />}
                        {editReply && <UpdateReply reply={getReply} loader={loader} setLoader={setLoader} commentId={commentId} id={id} />}
                    </div>
                )
            )
            }


        </>
    )

}

export default Reply