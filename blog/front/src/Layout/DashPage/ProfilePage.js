import React, { useContext, useRef, useState } from 'react'
import css from '../../css/Dashboard.module.css'
import { userContext } from '../../context/userContext'
import { MdModeEditOutline } from "react-icons/md";
import { format } from 'date-fns'

function ProfilePage () {
    const imageSelector = useRef()
    const { user } = useContext(userContext)
    const [ hide, setHide ] = useState(false)
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ file, setFile ] = useState("")
    const [ fileUrl, setFileUrl ] = useState("")
    const [ uploadProgress, setUploadProgress ] = useState(0)


    const HandleEdit = () => {
        setHide(true)
    }

    const handleImage = (e) => {
        const filesrc = e.target.files
        if(filesrc) {
            setFile(filesrc)
            setFileUrl(URL.createObjectURL(filesrc[ 0 ]))
        }
    }
    const handleClickSource = () => {
        // Check if targetRef.current is defined before triggering click event
        if(imageSelector.current) {
            imageSelector.current.click();
        }
    };
    const handleEdit = async (e) => {
        const data = new FormData()
        data.set("name", name)
        data.set("email", email)
        data.set('file', file[ 0 ])
        e.preventDefault()

        const response = await fetch(`http://localhost:4000/user/update/${user.id}`, {
            method: 'PATCH',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            }
        })


        const total = response.headers.get('content-length');
        if(total !== null) {
            const reader = response.body.getReader();
            let receivedLength = 0;

            while(true) {
                const { done, value } = await reader.read();

                if(done) {
                    break;
                }

                receivedLength += value.length;
                const progress = Math.round((receivedLength / total) * 100);
                setUploadProgress(progress);
            }
        }

    }

    return (
        <div className={css.profile}>
            <h1>Profile</h1>
            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            <form onSubmit={handleEdit}>
                {hide && <input type="file" onChange={handleImage} ref={imageSelector} hidden />}
                <div className={css.profile_container} onClick={handleClickSource}>
                    <img src={fileUrl || `http://localhost:4000/uploads/${user.profile}`} alt="profileImage" />
                </div>
                <div className={css.inline}>
                    <label>Name:</label> {!hide && <span>{user.name}</span>}
                    {hide && <input type="text" value={name || user.name} onChange={e => setName(e.target.value)} />}
                </div>
                {user.role === "1" ? `Admin of this Blog since ${format(new Date(user.createdAt), "MMM dd, yyyy")}` : `Editor of this Blog since ${format(new Date(user.updatedAt), "MMM dd, yyyy")}`}
                <div className={css.inline}>
                    <label>Email:</label> {!hide && <span>{user.email}</span>}
                    {hide && <input type="email" value={email || user.email} onChange={e => setEmail(e.target.value)} />}
                </div>
                <div className={css.edit_container}>
                    {!hide && <p className={css.edit} onClick={HandleEdit}><MdModeEditOutline /> Edit Profile</p>}
                    {hide && <button className='button'>Update</button>}
                </div>
            </form>
        </div>
    )
}

export default ProfilePage