import React, { useState, useEffect } from 'react'
import "./messageText.css";


function MessageText({
    text = 'dummy',
    user = 'user',
    currentUser = ''
}) {
    const [isCurrentUser, setIsCurrentUser] = useState(false)

    useEffect(() => {
        if(user === currentUser){
            setIsCurrentUser(true)
        }else{
            setIsCurrentUser(false)
        }
    },[user, currentUser])

    return (
        isCurrentUser ?
        (  
        <div className="d-flex align-items-center flex-row-reverse">
            <p className="message_text p-3 bg-primary text-white p-0 m-0 mx-2">{text}</p>
            <small className="text-muted font-weight-bold">{user}</small>
        </div>
    )
    :(
        <div className="d-flex align-items-center">
            <p className="message_text p-3 bg-light text-dark p-0 m-0 mx-2">{text}</p>
            <small className="text-muted font-weight-bold">{user}</small>
        </div>
    )
    
    )
}

export default MessageText
