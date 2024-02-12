import React, { useContext, useEffect, useState } from 'react'
import css from '../css/Detailpost.module.css'
import { useParams, Navigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { userContext } from '../context/userContext'
import { FaCommentAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit, FaReply } from "react-icons/fa";
import Reply from './Reply'
import Deleteplate from '../UI/Deleteplate'
import DeleteComment from '../UI/DeleteComment'
import UpdateDelete from './DashPage/UpdateComment'
import UpdateComment from './DashPage/UpdateComment'

function DetailPost () {
    const [ onePost, setOnePost ] = useState("")
    const [ error, setError ] = useState({
        getpost: "",
    })
    const { user } = useContext(userContext)
    const [ comment, setComment ] = useState("")
    const [ getComment, setgetComment ] = useState([])
    const [ reply, setReply ] = useState("")
    const [ commentId, setCommentId ] = useState("")
    const [ onReply, setOnReply ] = useState(false)
    const [ loader, setLoader ] = useState(false)
    const [ redirect, setRedirect ] = useState(false)
    const [ deletePost, setDeletePost ] = useState(false)
    const [ deleteComment, setDeleteComment ] = useState(false)
    const [ getDeletedComment, setGetComment ] = useState("")
    const [ editComment, setEditComment ] = useState(false)


    const { id } = useParams();

    useEffect(() => {
        const getOne = async () => {
            const response = await fetch(`http://localhost:4000/post/${id}`)
            const json = response.json()
            if(!response.ok) {
                return json.then(data => setError({ getpost: data.error }))
            } else {
                json.then(data => setOnePost(data))
            }
        }
        getOne()
    }, [ loader ])

    useEffect(() => {
        const getComment = async () => {
            const response = await fetch(`http://localhost:4000/comment/${id}`)
            const json = response.json()
            if(response.ok) {
                json.then(data => setgetComment(data))
            }
        }
        getComment()
    }, [ loader ])

    const showReply = (id) => {
        setOnReply(true)
        setCommentId(id)
    }


    const handlereply = async (e) => {
        setOnReply(false)

        e.preventDefault()
        const createreply = await fetch('http://localhost:4000/comment/replycomment', {
            method: "POST",
            body: JSON.stringify({ author: user.id, reply, comment: commentId }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(createreply.ok) {
            setReply('')
            setLoader(!loader)
        }
    }

    const handleComment = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/comment/`, {
            method: "POST",
            body: JSON.stringify({ post: id, author: user.id, comment }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok) {
            setComment('')
            setLoader(!loader)
        }
    }

    const handleLikePost = async (id) => {
        if(user) {
            const response = await fetch(`http://localhost:4000/post/like/${id}`, {
                method: "PUT",
                body: JSON.stringify({ userId: user.id }),
                headers: { "Content-Type": "application/json" }
            })
            if(response.ok) {
                setLoader(!loader)
            }
        } else {
            setRedirect(true)
        }

    }

    const handleLikeComment = async (id) => {
        if(user) {
            const response = await fetch(`http://localhost:4000/comment/like/${id}`, {
                method: "PUT",
                body: JSON.stringify({ userId: user.id }),
                headers: { "Content-Type": "application/json" }
            })
            if(response.ok) {
                setLoader(!loader)
            }
        } else {
            setRedirect(true)
        }

    }

    const handlePostDelete = () => {
        setDeletePost(true)
    }
    const handleCommentDelete = (comment) => {
        setDeleteComment(true)
        setGetComment(comment)
    }
    const handleCommentEdit = (comment) => {
        setEditComment(true)
        setGetComment(comment)

    }

    if(redirect) {
        return <Navigate to="/login" />
    }

    return (
        <div className={css.detail_container} >
            {error.server && <p className='error'>{error.server}</p>}
            {onePost &&
                <div className={css.one_post}>
                    <div className={css.up_post}>
                        <div className={css.up_left_post}>
                            <span>
                                <h4>{onePost.catagory}</h4>
                                <time>{format(new Date(onePost.createdAt), "MMM dd, yyyy")}</time>
                            </span>
                            <h2>{onePost.title}</h2>
                            <p className={css.summary}>{onePost.summary}</p>
                            <div className={css.creator}>
                                <img src={`http://localhost:4000/uploads/${onePost.author.profile}`} alt="user profile" />
                                <div>
                                    <h4>{onePost.author.name}</h4>
                                    <p>{onePost.author.role === "1" ? "Admin of Demasqo blog" : "Editor of Demasqo blog"}</p>
                                </div>
                            </div>

                        </div>
                        <img className={css.cover} src={`http://localhost:4000/uploads/${onePost.cover}`} alt="Cover" />
                    </div>
                    <div className={css.content}>
                        <div dangerouslySetInnerHTML={{ __html: onePost.content }} />
                    </div>
                    <div className={"interaction"}>
                        <div className={"like"}>
                            <span>{onePost.like.length}</span>
                            {onePost.like.includes(user.id) ?
                                <span
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => handleLikePost(onePost._id)} ><AiFillLike /></span>
                                : <span
                                    style={{ color: "green", cursor: "pointer" }}
                                    onClick={() => handleLikePost(onePost._id)} ><AiFillLike /></span>}
                        </div>
                        <div className={"commentbutton"}><span>{getComment.length}</span><FaCommentAlt /></div>
                        {user.id === onePost.author._id && <>
                            <div className={"edit"}> <Link to={`/editpost/${onePost._id}`}><FaEdit /></Link></div>
                            <div className={"delete"} onClick={handlePostDelete}><RiDeleteBin5Fill /></div>
                        </>}
                        {deletePost && <Deleteplate post={onePost} />}
                    </div>
                    <div className={css.comment}>
                        <form onSubmit={handleComment}>
                            <textarea cols="30" rows="3" value={comment} onChange={e => setComment(e.target.value)}>
                            </textarea>
                            <button type='submit' className={`button ${comment === "" ? 'disable' : ''}`}>Comment</button>
                        </form>
                        <div className={css.comment_box_container}>
                            {getComment.length > 0 && getComment.map((comment, index) => (
                                <div key={index} className={css.comment_box}>
                                    <div className={css.comment_creator}>
                                        <img src={`http://localhost:4000/uploads/${comment.author.profile}`} alt="creator profile" />
                                        <div>
                                            <h4>{comment.author.name}</h4>
                                            <p>{comment.author.role === "1" ? "Admin" : comment.author.role === "2" ? "Editor" : "Member"}</p>
                                        </div>
                                    </div>
                                    <p className={css.content}>{comment.comment}</p>
                                    <div className={"interaction"}>
                                        <div className={"like"} >
                                            <span>{comment.like.length}</span>
                                            {comment.like.includes(user.id) ?
                                                <span
                                                    style={{ color: "red", cursor: "pointer" }}
                                                    onClick={() => handleLikeComment(comment._id)} ><AiFillLike /></span>
                                                : <span
                                                    style={{ color: "green", cursor: "pointer" }}
                                                    onClick={() => handleLikeComment(comment._id)} ><AiFillLike /></span>
                                            }
                                        </div>
                                        <div className={"commentbutton"} onClick={() => showReply(comment._id)}>{<FaReply />}</div>
                                        {comment.author._id === user.id &&
                                            <>
                                                <div className={"edit"} onClick={() => handleCommentEdit(comment)}><FaEdit /></div>
                                                <div className={"delete"} onClick={() => handleCommentDelete(comment)}><RiDeleteBin5Fill /></div>
                                            </>
                                        }
                                    </div>
                                    {deleteComment && <DeleteComment comment={getDeletedComment} loader={loader} setLoader={setLoader} id={id} />}
                                    {editComment && <UpdateComment comment={getDeletedComment} loader={loader} setLoader={setLoader} id={id} />}
                                    <div style={{ marginLeft: "2rem" }}>
                                        {onReply && comment._id === commentId &&
                                            <form onSubmit={handlereply}>
                                                <textarea cols="30" rows="3" value={reply} onChange={e => setReply(e.target.value)}>
                                                </textarea>
                                                <button type='submit' className={`button ${reply === "" ? 'disable' : ''}`}>Reply</button>
                                            </form>
                                        }
                                        <Reply user={user} commentId={comment._id} loader={loader} setLoader={setLoader} id={id} />
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DetailPost