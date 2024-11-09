//thsi is the cart page to get all booking status
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthenticationContext';
import axios from 'axios';
import Loader from '../Loader';
import EmptyCart from '../EmptyCart';
import AdminCart from './AdminCart';

const BookHub = () => {
  const { userInfo } = useAuth();
  const [orderData, setOrderData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/order/${userInfo.email}`);
        if (response.status === 200) {
          // console.log(response.data);
          setOrderData(response.data);
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, [userInfo.email]);

  return (
    <>
      {userInfo.role !== 'admin' ? (
        <div className=''>
          {loader ? (
            <Loader />
          ) : orderData.length == 0 ? (
            <EmptyCart />
          ) : (
            <div className='pt-20 pb-28 md:pb-4 px-2 space-y-5'>
              {orderData.map((item, index) => (
                <div className='bg-white text-black p-2 sm:p-5 rounded-xl shadow-2xl space-y-2 w-full max-w-md mx-auto' key={index}>
                  <div className='flex justify-between items-center gap-4'>
                    <h1 className='text-xl uppercase font-bold'>{item.bikeNumber}</h1>
                    <p className='text-green-600 font-medium'>{item.serviceStatus}</p>
                  </div>
                  <p className='uppercase font-medium'>{item.bikeName}</p>
                  <p>Date : {item.date}</p>
                  <p><span className='font-medium'>Services:</span> {item.servicesRequired.map((i,ind) => {
                    return (
                      <span key={ind}>{i.itemName},</span>
                    )
                  })}</p>
                  <p className='capitalize font-medium text-blue-700'>Payment : {item.paymentStatus}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <AdminCart />
      )

      }
    </>

  );
};

export default BookHub;
