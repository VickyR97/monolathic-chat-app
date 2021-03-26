import React from 'react'

function InfoBar({
    roomName = 'Dummy'
}) {
    return (
        <div className="bg-primary text-white p-3"> 
            <p className="ml-2 m-0 p-0 font-weight-bold">{roomName}</p>
        </div>
    )
}

export default InfoBar
