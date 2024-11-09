//Used to make changes on the orders
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from '../../Context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminModal = ({ item, isopen, setopen, setUpdate }) => {
    // let [isOpen, setIsOpen] = useState(true);

    const buttonStyle = `w-full bg-blue-700 p-2 text-xl capitalize border border-r text-white rounded-xl focus:outline-none `;

    const labelStyle = 'w-full capitalize'
    const inputStyle = `w-full p-2 bg-gray-700 text-white rounded-xl`

    const { userInfo, setUserInfo } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormdData] = useState({
        paymentStatus: '',
        serviceStatus: '',
    })

    useEffect(() => {
        setFormdData(() => ({
            paymentStatus: item.paymentStatus,
            serviceStatus: item.serviceStatus
        }))
    }, [])

    // console.log(item);

    function closeModal() {
        setopen(false)
    }

    function openModal() {
        setopen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
        // console.log(name + " " + value);
    }

    const handleUpdate = async () => {
        const credentials = {
            email: item.email,
            bikeName: item.bikeName,
            bikeNumber: item.bikeNumber,
            serviceRequired: item.serviceRequired,
            totalAmount: item.totalAmount,
            paymentStatus: formData.paymentStatus,
            serviceStatus: formData.serviceStatus
        }
        try {
            const response = await axios.put(`http://localhost:4000/order/update/${item._id}`, {
                credentials
            })
            if (response.status === 200) {
                // console.log(response);
                setopen(false);
                setUpdate((prevData) => !prevData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Transition appear show={isopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-50"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-2">
                                    <div className='text-2xl flex justify-end' onClick={closeModal}>
                                        <IoCloseOutline />
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 text-gray-900"
                                    >
                                        {item.email}
                                    </Dialog.Title>
                                    <div className="capitalize space-y-2">
                                        <h3>brand : {item.bikeName}</h3>
                                        <p className="text-sm text-gray-500 uppercase">
                                            {item.bikeNumber}
                                        </p>
                                        <p>price = ₹{item.totalAmount} </p>
                                        <p><span className='font-medium'>Services:</span> {item.servicesRequired.map((i,ind) => {
                                            return (
                                                <span key={ind}>{i.itemName},</span>
                                            )
                                        })}</p>
                                    </div>
                                    <div className='space-y-2'>
                                        <div>
                                            <label className={labelStyle}>
                                                service status
                                            </label>
                                            <select name="serviceStatus" className={inputStyle} onClick={handleChange}>
                                                <option value='booked'>Booked</option>
                                                <option value='accepted'>Accepted</option>
                                                <option value='delivery'>Delivery</option>
                                                <option value='delivered'>Delivered</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>
                                                payment status
                                            </label>
                                            <select name="paymentStatus" className={inputStyle} onClick={handleChange}>
                                                <option value='COD'>COD</option>
                                                <option value='paided'>Paided</option>
                                            </select>
                                        </div>
                                        <div className='w-full max-w-40 mx-auto'>
                                            <button className={buttonStyle} onClick={handleUpdate}>update</button>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default AdminModal;
