import React, { useState } from 'react'
import './CreateRoom.css'

export default function CreateRoom(props) {


    const [roomName, setRoomName] = useState('');
    const [roomColor, setRoomColor] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('defaultOption')


    return (
        <div className='selectRoom'>

            <select className='createRoomInput' onChange={(event) => {
                const value = event.target.value;
                setSelectedRoom(value);

            }}>
                <option value="defaultOption" selected disabled hidden> Choose new room</option>
                {props.rooms.map((room) => {
                    return (<option value={room.name}>{room.name}</option>)
                })}
            </select>


            <input
                className='createRoomInput'
                type='text'
                placeholder='Room name'
                value={roomName}
                onInput={(event) => {
                    const value = event.target.value;
                    setRoomName(value);

                }}
            ></input>


            <label className='createRoomInput labelColor'>Room color:
                <input
                    className='createRoomInput'
                    type='color'
                    value={roomColor}
                    onInput={(event) => {
                        const value = event.target.value;
                        setRoomColor(value);

                    }}
                ></input>
            </label>


            <button
                className='createRoomButton'
                onClick={() => { props.onAddRoom(roomName, roomColor, selectedRoom) }}
            >Create</button>


        </div>
    )
}
