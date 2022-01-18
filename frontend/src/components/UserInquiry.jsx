import React from 'react'
import { Link } from 'react-router-dom'

const UserInquiry = (props) => {


    return (
        <div className="user-inquiry">{props.question}
            <Link className="link" to={`/${props.path}`}> {props.linkText}</Link>
        </div>
    )
}

export default UserInquiry
