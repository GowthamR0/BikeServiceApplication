/* This page is used to get all the booked,in progress service status from orders collection */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../Styles/Tabel.css'
import Loader from '../Loader';

import { FaArrowRight } from "react-icons/fa6";
import AdminModal from '../Modals/AdminModal';
import EmptyCart from '../EmptyCart';

const AdminCart = () => {

  const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState();
  const [inputData, setInputData] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState();
  const [reload, setReload] = useState(false);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/order');
        if (response.status === 200) {
          // console.log(response.data);
          setData(response.data);
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [reload]);

  const handleChange = (e) => {
    setInputData(e.target.value.toLowerCase());
  }

  const handleSubmit = () => {
    const filteredData = data.filter((item) => {
      return (
        item.date.includes(inputData) || item.email.toLowerCase().includes(inputData) || item.serviceStatus.toLowerCase().includes(inputData)
      )

    });
    setData(filteredData);
  }

  const handleClick = (item) => {
    setShowModal(true);
    setModalItem(item);
  }

  return (
    <div className='pt-20 pb-24 px-2 md:pb-0 text-white'>
      {
        loader ? (
          <Loader />
        ) : data.length == 0 ? (
          <EmptyCart />
        ) : (
          <div>
            {
              window.innerWidth < 700 ?

                <p className='flex justify-center items-center h-screen text-2xl' id="anta-regular">Use desktop for better view</p> :

                <div className='space-y-3'>
                  <div className='w-full flex items-center max-w-md mx-auto'>
                    <input
                      type='text'
                      className='w-full rounded-l-xl w-full text-black p-3 focus:outline-none'
                      placeholder='search here'
                      name='inputData'
                      value={inputData}
                      onChange={handleChange}
                    />
                    <div className='bg-white p-4 rounded-r-xl text-black' onClick={handleSubmit}>
                      <FaArrowRight />
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>date</th>
                        <th>email</th>
                        <th>amount</th>
                        <th>status</th>
                        <th>payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.map((item, index) => {
                          return (
                            <tr key={index} onClick={() => handleClick(item)}>
                              <td>{item.date}</td>
                              <td style={{ textTransform: `initial` }}>{item.email}</td>
                              <td>{item.totalAmount}</td>
                              <td>{item.paymentStatus}</td>
                              <td
                                className={
                                  item.serviceStatus === "accepted" ? 'text-green-500' : '' ||
                                    item.serviceStatus === 'delivery' ? 'text-orange-500' : '' ||
                                      item.serviceStatus === 'delivered' ? 'text-red-500' : ''
                                }
                              >
                                {item.serviceStatus}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  {showModal &&
                    <AdminModal item={modalItem} isopen={showModal} setopen={setShowModal} setUpdate={setReload} />
                  }
                </div>
            }
          </div>
        )
      }

    </div>
  )
}

export default AdminCart