import React, { useState } from 'react'

export default function Products(props) {


    return (
        <div>


            {props.productList.map((product) => {

                if (product.roomName === props.roomName) {

                    return (
                        <div>
                            <button onClick={() => {

                                props.updateProductIsOn(product);

                            }}

                                style={{ backgroundColor: product.isOn ? 'green' : 'red', width: '200px', height: '20px' }} >{product.name}</button>
                        </div>

                    )

                }
            })}




        </div>
    )
}
