//liting all the services
import React, { useEffect, useState } from 'react'

import { useAuth } from '../../Context/AuthenticationContext.jsx'
import TableModal from '../Modals/TableModal.jsx';
import Loader from '../Loader';

import '../Styles/Tabel.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiceHub = () => {

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [reload, setReload] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/service');
        if (response.status === 200) {
          setData(response.data);
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchServiceData();
  }, [reload]);

  const handleclick = (event, item) => {
    const eventData = event.target.checked;

    // Check if the item is already selected
    const selectedItemIndex = selectedData.findIndex((data) => data.id === item._id);

    if (eventData) {
      // If the checkbox is checked and the item is not selected yet, add it to the selectedData array
      if (selectedItemIndex === -1) {
        setSelectedData((prevData) => [...prevData, { id: item._id, itemName: item.itemName, price: item.price }]);
      }
    } else {
      // If the checkbox is unchecked, remove the item from the selectedData array
      if (selectedItemIndex !== -1) {
        setSelectedData((prevData) => prevData.filter((data) => data.id !== item._id));
      }
    }
  }

  const handleTableClick = (item) => {
    setCurrentData(item);
    setShowModal(true);
  }

  const handleSubmit = () => {
    navigate('/servicehub/booking', { state: selectedData });
  }

  return (
    <div className='pt-20 pb-28 md:pb-4'>
      {loader ? <Loader /> :
        <div className='px-2 space-y-3'>
          {userInfo.role !== 'admin' &&
            <div>
              <p
                className='w-full bg-white text-black w-full h-20 rounded-xl shadow-lg max-w-xl mx-auto overflow-y-scroll p-2'

              >
                <span className=''>
                  {selectedData.map((item, index) => {
                    return (
                      <span key={index}>{item.itemName} , </span>
                    )
                  })
                  }
                </span>
              </p>
              <div className='flex items-center w-full max-w-sm mx-auto'>
                <div className='w-1/2 py-2'>
                  <button
                    className='text-xl w-full bg-blue-600 p-2 rounded-l-xl text-white'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                <div className='w-1/2 py-2'>
                  <p className='text-xl text-center w-full bg-green-600 p-2 rounded-r-xl text-white'>
                    {/* reduce function to calculate the total price */}
                    Total : ₹{selectedData.reduce((total, item) => total + parseInt(item.price), 0)}
                  </p>
                </div>
              </div>
            </div>
          }
          <table>
            <thead>
              <tr scope='col'>
                <th>box</th>
                <th>item name</th>
                <th>brand</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" onClick={(event) => handleclick(event, item)} /></td>
                    <td className='font-bold' onClick={() => handleTableClick(item)}>{item.itemName}</td>
                    <td onClick={() => handleTableClick(item)}>{item.brand}</td>
                    <td onClick={() => handleTableClick(item)}>₹{item.price}</td>
                  </tr>
                )
                )
              }
            </tbody>
          </table>
          {showModal &&
            <TableModal item={currentData} isopen={showModal} setopen={setShowModal} setUpdate={setReload} />
          }
        </div>
      }

    </div>
  )
}

export default ServiceHub;
