import React, { useState } from 'react'

export default function AddProduct(props) {

    const [selectedProduct, setSelectedProduct] = useState('');

    return (
        <div>
            <select onChange={(event) => {
                setSelectedProduct(event.target.value);
            }}>
                <option value="" selected disabled hidden>Choose product</option>
                {props.products.map((product) => {
                    return (<option value={product}>{product}</option>)
                })}
            </select>
            <button onClick={() => {
                const productProperties = {
                    name: selectedProduct,
                    roomType: props.roomType,
                    roomName: props.roomName,
                    isOn: false,
                    id: Math.floor(Math.random() * 100)

                };
                props.onAddButton(productProperties);
            }}>Add</button>



        </div >
    )
}
