import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice'
import QHeader from '../QHeader'
import "./Profile.css";
import { Link } from 'react-router-dom'

function Profile() {
    let user = useSelector(selectUser)
    console.log(user)
    return (
        <>
            <header>
                <QHeader />
            </header>
            <main>
                <div className="profileMain">
                    <img src={user.data.profile_img_url} alt="user" />
                    <div className="details">
                        <h1 >{user.data.name.charAt(0).toUpperCase()+user.data.name.slice(1)}'s Profile</h1>
                        <Link>Add Profile Credentials</Link>
                    </div>
                    
                </div>
            </main>
            
        </>
    )
}

export default Profile
