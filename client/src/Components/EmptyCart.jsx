import React from 'react'
import { FcEmptyTrash } from "react-icons/fc";

const EmptyCart = () => {
    return (
        <div 
        className='text-2xl text-white flex justify-center items-center h-screen'
        id='anta-regular'
        >
            <p>Cart is empty</p>
            <div className='text-3xl'>
                <FcEmptyTrash />
            </div>
        </div>
    )
}

export default EmptyCart