import React from 'react'
import './Rooms.css'
import { Link } from 'react-router-dom'


export default function Rooms(props) {
    return (


        <div className='container' >

            {
                props.roomList.map((room) => {

                    return (

                        <Link to={`/room${room.name}`}>
                            <div className='roomStyle' style={{ backgroundColor: room.color }}>
                                <p>{room.name}</p>
                            </div>
                        </Link>
                    )
                })}


        </div>
    )
}
