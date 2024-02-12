import React, { useEffect, useState } from 'react'
import css from "../css/Home.module.css"
import book from "../asert/book.png"
import { useSpring, animated } from '@react-spring/web'
import Footer from './Footer'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'


function Number ({ n }) {
    const { number } = useSpring({
        form: { number: 0 },
        number: n,
        delay: 200,
        config: { mass: 1, tension: 20, friction: 10 }
    })
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}

function Home () {
    const [ oneview, setOneview ] = useState(null)
    const [ fiveview, setFiveview ] = useState(null)
    const [ error, setError ] = useState({ oneview: "", fiveview: "" })

    useEffect(() => {
        const oneview = async () => {
            const res = await fetch("http://localhost:4000/post/fiveview")
            const json = res.json()
            if(!res.ok) {
                json.then(data => setError({ fiveview: data.error }))
            } else {
                json.then(data => setFiveview(data))
            }
        }
        oneview()
    }, [])

    useEffect(() => {
        if(fiveview) {
            setOneview(fiveview.slice(0, 1))
        }
    }, [ fiveview ])

    return (
        <>
            <div className={css.Home}>
                <div className={css.main}>
                    <img src={book} alt="book" className={css.banner} />
                    <div className={css.view}><span>Number of view</span><span className={css.Number}><Number n={500} />+</span></div>
                    <div className={css.view}><span>Number of member</span><span className={css.Number}><Number n={300} />+</span></div>
                </div>
                <div className={css.postAmount}>
                    <div className={css.view}><span>Number of posts</span><span className={css.Number}><Number n={1300} />+</span></div>
                    <div className={css.view}><span>Number of comments</span><span className={css.Number}><Number n={300} />+</span></div>
                </div>

                <div className={css.post_container} >
                    <div className={css.postPart}>
                        {error.fiveview && <p className='error'>{error.fiveview}</p>}
                        {oneview && <div className={css.bestPost}>
                            <Link to={`blog/detail/${oneview[ 0 ]._id}`}><img className={css.postbanner} src={`http://localhost:4000/uploads/${oneview[ 0 ].cover}`} alt="post banner" /></Link>
                            <div className={css.content}>
                                <small className={css.date}>{oneview[ 0 ].catagory}</small>
                                <Link to={`blog/detail/${oneview[ 0 ]._id}`}><p className={css.title}>{oneview[ 0 ].title}</p></Link>
                                <small className={css.summary}>{oneview[ 0 ].summary}</small>
                            </div>
                        </div>}
                        <div className={css.postMain}>
                            {fiveview && fiveview.map((eachone, index) => (
                                <div key={index} className={css.newpost}>
                                    <Link to={`detail/${eachone._id}`}><img className={css.postcover} src={`http://localhost:4000/uploads/${eachone.cover}`} alt="post banner" /></Link>
                                    <div className={css.titlePart}>
                                        <div className={css.catagory}>
                                            <p>{eachone.catagory}</p>
                                            <small>{format(new Date(eachone.createdAt), "MMM dd, yyyy")}</small>
                                        </div>
                                        <p style={{ marginBottom: "0.5rem" }}>Written by:{eachone.author.name}</p>
                                        <Link to={`detail/${eachone._id}`}><h2>{eachone.title}</h2></Link>
                                    </div>
                                </div>
                            ))
                            }
                            {!error.fiveview && <Link to='/blog' className={css.viewall}>View all</Link>}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home