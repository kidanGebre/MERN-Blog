import React, { useEffect, useState } from 'react'
import Reactquill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import css from "../../css/Dashboard.module.css"
import { Navigate, useParams } from "react-router-dom"


const modules = {
    toolbar: [
        [ { 'header': [ 1, 2, false ] } ],
        [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
        [ { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' } ],
        [ 'link', 'image' ],
        [ 'clean' ]
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

function EditPost () {
    const [ title, setTitle ] = useState("")
    const [ summary, setSummary ] = useState("")
    const [ file, setFile ] = useState("")
    const [ content, setContent ] = useState("")
    const [ catagory, setCatagory ] = useState("")
    const [ error, setError ] = useState({ server: "", empty: "" })
    const [ redirect, setRedirect ] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        const getOnePost = async () => {
            const response = await fetch(`http://localhost:4000/post/${id}`)
            if(response.ok) {
                response.json().then(data => {
                    setTitle(data.title)
                    setSummary(data.summary)
                    setContent(data.content)
                    setCatagory(data.catagory)
                    setFile(data.file)
                })
            }
        }
        getOnePost()
    }, [])

    const handleSubmit = async (e) => {
        const data = new FormData()
        data.set("title", title)
        data.set("summary", summary)
        data.set("content", content)
        data.set('catagory', catagory)
        if(file?.[ 0 ]) {
            data.set("file", file[ 0 ])

        }

        e.preventDefault()
        if(title === "" || summary === "" || content === '' || catagory === '') {
            setError({ empty: "All fields are required" })
        }
        const response = await fetch(`http://localhost:4000/post/update/${id}`, {
            method: "POST",
            body: data
        })

        if(response.ok) {
            setRedirect(true)
        } else {
            response.json().then(data => setError({ server: data.error }))
        }

    }

    if(redirect) {
        return <Navigate to={`/blog/detail/${id}`} />
    }


    return (
        <div className={css.c_post_cont}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                {error.server && <p>{error.server}</p>}
                {error.empty && <p>{error.empty}</p>}

                <label>Catagory:</label>
                <select defaultValue={catagory} onChange={e => setCatagory(e.target.value)}>
                    <option value="News">News</option>
                    <option value="Culture">Culture</option>
                    <option value="History">History</option>
                    <option value="Fact">Fact</option>
                    <option value="Science">Science</option>
                </select>
                <label>Title:</label>
                <input type="text" className='input' value={title} onChange={e => setTitle(e.target.value)} />
                <label>Summary:</label>
                <input type="text" className='input' value={summary} onChange={e => setSummary(e.target.value)} />
                <label>Cover image:</label>
                <input type="file" className='input' onChange={e => setFile(e.target.files)} />
                <label>Main Content:</label>
                <Reactquill modules={modules} formats={formats} value={content} onChange={newValue => setContent(newValue)} />
                {error.server && <small className='error'>{error.server}</small>}
                <button type='submit' className='button'>Create</button>
            </form>
        </div>
    )
}

export default EditPost