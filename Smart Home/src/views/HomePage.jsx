import './HomePage.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Rooms from '../components/Rooms'



export default function HomePage(props) {
    return (
        <div >

            <div> <Rooms roomList={props.roomList} ></Rooms> </div>

            <Link to='/addroom'> <button className='createRoomButton'>     +     </button> </Link>

        </div>
    )
}


