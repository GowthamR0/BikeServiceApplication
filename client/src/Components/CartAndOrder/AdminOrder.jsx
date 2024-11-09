/* This page is used to get all the records from the completedorders collection */

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthenticationContext'
import axios from 'axios';
import Loader from '../Loader';
import EmptyCart from '../EmptyCart';

const AdminOrder = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/completedorder`);
        if (response.status === 200) {
          // console.log(response);
          setData(response.data);
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className='pt-20 pb-24 md:pb-0 px-2'>
      {
        loader ? (
          <Loader />
        ) : data.length == 0 ? (
          <EmptyCart />
        ) : (
          <div className='space-y-5 capitalize w-full max-w-md mx-auto'>
            {data.map((item, index) => {
              return (
                <div key={index} className='bg-white rounded-xl p-2 space-y-2'>
                  <div className='flex justify-between'>
                    <p className='font-bold' style={{ textTransform: `uppercase` }}>{item.bikeNumber}</p>
                    <p className='text-green-500 font-bold'>{item.serviceStatus}</p>
                  </div>
                  <p className='font-medium'>{item.bikeName}</p>
                  <p>Data : {item.date}</p>
                  <p><span className='font-medium'>Services:</span> {item.servicesRequired.map((i, ind) => {
                    return (
                      <span key={ind}>{i.itemName},</span>
                    )
                  })}</p>
                  <p className='font-medium'>Total Amount: {item.totalAmount}</p>
                </div>
              )
            })}
          </div>
        )
      }

    </div>
  )
}

export default AdminOrder;