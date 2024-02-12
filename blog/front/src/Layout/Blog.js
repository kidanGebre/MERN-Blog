import React, { useContext, useEffect, useState } from 'react'
import css from "../css/Blog.module.css"
import { Link, Navigate } from 'react-router-dom'
import { GrFormView } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { userContext } from '../context/userContext'
import Footer from '../component/Footer'
import { format } from 'date-fns';

function Blog () {
    const { user } = useContext(userContext)
    const [ posts, setPosts ] = useState(null)
    const [ allposts, setAllSPosts ] = useState(null)
    const [ post, setPost ] = useState("")
    const [ science, setScience ] = useState("")
    const [ news, setNews ] = useState("")
    const [ fact, setFact ] = useState("")
    const [ history, setHistory ] = useState("")
    const [ postfive, setPostfive ] = useState(null)
    const [ redirect, setRedirect ] = useState(false)
    const [ loader, setLoader ] = useState(false)

    const [ error, setError ] = useState({
        oneview: "",
        fiveview: "",
        fournew: ""

    })

    useEffect(() => {
        const allposts = async () => {
            const res = await fetch("http://localhost:4000/post/")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ fiveview: data.error }))
            } else {
                json.then(data => setAllSPosts(data))
            }
        }
        allposts()
    }, [ loader ])
    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch("http://localhost:4000/post/four")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ fournew: data.error }))
            } else {
                json.then(data => setPosts(data))
            }
        }
        const getoneview = async () => {
            const res = await fetch("http://localhost:4000/post/oneviewculture")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ oneview: data.error }))
            } else {
                json.then(data => setPost(data))
            }
        }
        const getoneNews = async () => {
            const res = await fetch("http://localhost:4000/post/oneviewnews")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ onenews: data.error }))
            } else {
                json.then(data => setNews(data))
            }
        }

        const getonehistory = async () => {
            const res = await fetch("http://localhost:4000/post/oneviewhistory")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ onehistory: data.error }))
            } else {
                json.then(data => setHistory(data))
            }
        }
        const getonefact = async () => {
            const res = await fetch("http://localhost:4000/post/oneviewfact")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ onefact: data.error }))
            } else {
                json.then(data => setFact(data))
            }
        }
        const getonescience = async () => {
            const res = await fetch("http://localhost:4000/post/oneviewscience")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ onescience: data.error }))
            } else {
                json.then(data => setScience(data))
            }
        }
        getPosts()
        getoneview()
        getoneNews()
        getonefact()
        getonehistory()
        getonescience()
    }, []);

    useEffect(() => {
        const fiveview = async () => {
            const res = await fetch("http://localhost:4000/post/fiveview")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ fiveview: data.error }))
            } else {
                json.then(data => setPostfive(data))
            }
        }

        fiveview()
    }, [])

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

    if(redirect) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className={css.blog_container}>
                <div className={css.blog}>
                    <div className={css.blog_head}>
                        <h1>
                            <Link to='/' className={css.logo}><span>Dema</span>sqo</Link>
                        </h1>
                        <div className={css.link}>
                            <p className={css.welcome}>Welcome to our Blog</p>
                            {!user && <Link to='/signup'>Signup</Link>}
                        </div>
                    </div>
                    <div className={css.newpost_container}>
                        {
                            posts && posts.map((post, index) => (
                                <div key={index} className={css.newpost}>
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
                            ))
                        }
                    </div>

                    <div className={css.blog_banner}>
                        {post.length > 0 && <div className={css.big_banner}>
                            <Link to={`detail/${post._id}`}><img src={`http://localhost:4000/uploads/${post[ 0 ].cover}`} alt="ethiopian" /></Link>
                            <div className={css.hover}>
                                <div className={css.catagory}>
                                    <p>{post[ 0 ].catagory}</p>
                                    <small>{format(new Date(post[ 0 ].createdAt), "MMM dd, yyyy")}</small>
                                </div>
                                <Link to={`detail/${post._id}`}><h3>{post[ 0 ].title}</h3></Link>
                            </div>

                        </div>}
                        {news.length > 0 && <div className={css.smallOne}>
                            <img src={`http://localhost:4000/uploads/${news[ 0 ].cover}`} alt="ethiopian" />
                            <div className={css.hover}>
                                <div className={css.catagory}>
                                    <p>{news[ 0 ].catagory}</p>
                                    <small>{format(new Date(news[ 0 ].createdAt), "MMM dd, yyyy")}</small>
                                </div>
                                <Link to={`detail/${news[ 0 ]._id}`}><h3>{news[ 0 ].title}</h3></Link>
                            </div>
                        </div>}
                        {history.length > 0 && <div className={css.smallOne}>
                            <Link to={`detail/${history[ 0 ]._id}`}><img src={`http://localhost:4000/uploads/${history[ 0 ].cover}`} alt="ethiopian" /></Link>
                            <div className={css.hover}>
                                <div className={css.catagory}>
                                    <p>{history[ 0 ].catagory}</p>
                                    <small>{format(new Date(history[ 0 ].createdAt), "MMM dd, yyyy")}</small>
                                </div>
                                <Link to={`detail/${history[ 0 ]._id}`}><h3>{history[ 0 ].title}</h3></Link>
                            </div>
                        </div>}
                        {fact.length > 0 && <div className={css.smallOne}>
                            <Link to={`detail/${fact[ 0 ]._id}`}><img src={`http://localhost:4000/uploads/${fact[ 0 ].cover}`} alt="ethiopian" /></Link>
                            <div className={css.hover}>
                                <div className={css.catagory}>
                                    <p>{fact[ 0 ].catagory}</p>
                                    <small>{format(new Date(fact[ 0 ].createdAt), "MMM dd, yyyy")}</small>
                                </div>
                                <Link to={`detail/${fact[ 0 ]._id}`}><h3>{fact[ 0 ].title}</h3></Link>
                            </div>
                        </div>}
                        {science.length > 0 && <div className={css.smallOne}>
                            <Link to={`detail/${science[ 0 ]._id}`}><img src={`http://localhost:4000/uploads/${science[ 0 ]?.cover}`} alt="ethiopian" /></Link>
                            <div className={css.hover}>
                                <div className={css.catagory}>
                                    <p>{science[ 0 ]?.catagory}</p>
                                    <small>{format(new Date(science[ 0 ]?.createdAt), "MMM dd, yyyy")}</small>
                                </div>
                                <Link to={`detail/${science[ 0 ]._id}`}> <h3>{science[ 0 ]?.title}</h3></Link>
                            </div>
                        </div>}
                    </div>

                    <div className={css.blog_List}>
                        <div className={css.catagoryList}>
                            <ul>
                                <li>News</li>
                                <li>Culture</li>
                                <li>History</li>
                                <li>Science</li>
                                <li>Fact</li>
                            </ul>
                        </div>

                        <div className={css.blog_left}>
                            <h3>New posts</h3>
                            <div className={css.blog_list_container}>
                                {allposts && allposts?.map((oneofall, index) => (
                                    <div key={index} className={css.mainList}>
                                        <Link to={`detail/${oneofall._id}`}><img src={`http://localhost:4000/uploads/${oneofall.cover}`} alt="ethiopian" /></Link>
                                        <div className={css.hover}>
                                            <div className={css.catagory}>
                                                <p>{oneofall.catagory}</p>
                                                <small>{format(new Date(oneofall.createdAt), "MMM dd, yyyy")}</small>
                                            </div>
                                            <Link to={`detail/${oneofall._id}`}><h3>{oneofall.title}</h3></Link>
                                            <p className={css.content_dig_post}>{oneofall.summary}</p>
                                            <div className={css.commentBox}>
                                                <p>
                                                    {oneofall.view}
                                                    <GrFormView />
                                                </p>
                                                <p>
                                                    789
                                                    <Link to={`detail/${oneofall._id}`}><FaComment /></Link>
                                                </p>
                                                <p>
                                                    {oneofall.like.length}
                                                    {oneofall.like.includes(user.id) ?
                                                        <span
                                                            style={{ color: "red", cursor: "pointer" }}
                                                            onClick={() => handleLikePost(oneofall._id)} ><AiFillLike /></span>
                                                        : <span
                                                            style={{ color: "green", cursor: "pointer" }}
                                                            onClick={() => handleLikePost(oneofall._id)} ><AiFillLike /></span>}
                                                </p>
                                                <Link to={`detail/${oneofall._id}`} className={css.seemore}>See more</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={css.blog_right}>
                            <div className={css.search}>
                                <form>
                                    <input type="search" name="" id="" />
                                    <button type='submit'>Search</button>
                                </form>
                            </div>
                            <h3>This week posts</h3>
                            {postfive && postfive?.map((oneoffive, index) => (
                                <div className={css.right_blog_container}>
                                    <div key={index} className={css.NewList}>
                                        <Link to={`detail/${oneoffive._id}`}><img src={`http://localhost:4000/uploads/${oneoffive.cover}`} alt="ethiopian" /></Link>
                                        <div className={css.titleBox}>
                                            <Link to={`detail/${oneoffive._id}`}><h3>{oneoffive.title}</h3></Link>
                                            <small>Written by: {oneoffive.author.name}</small>
                                        </div>
                                    </div>

                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog