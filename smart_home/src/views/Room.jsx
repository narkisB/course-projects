import React from 'react'
import { useParams } from 'react-router-dom';
import './Room.css';
import AddProduct from '../components/AddProduct';
import Products from '../components/Products';



export default function Room(props) {

    const { name } = useParams();

    const room = props.getRoomByName(name);



    return (
        <div className='roomProperties'>

            <p>room name: {room.name}</p>
            <p>room type: {room.type}</p>
            <button onClick={props.onAddProduct} className='addProductButton'>Add product</button>

            <div>
                {props.isAddProductClicked ?
                    <AddProduct products={props.products} roomType={room.type} onAddButton={props.onAddButton} roomName={room.name}></AddProduct> : ' '
                }
            </div>

            <div>
                {props.isProductValid ? <Products productList={props.productList} roomName={room.name} updateProductIsOn={props.updateProductIsOn}></Products> : ''}

            </div>





        </div>
    )
}
