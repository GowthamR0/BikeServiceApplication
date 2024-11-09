import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from '../../Context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TableModal = ({ item, isopen, setopen, setUpdate }) => {
  // let [isOpen, setIsOpen] = useState(true);

  const buttonStyle = `w-1/2 bg-blue-700 p-2 text-xl capitalize border border-r text-white focus:outline-none `;

  const { userInfo, setUserInfo } = useAuth();
  const navigate = useNavigate();

  // console.log(item);

  function closeModal() {
    setopen(false)
  }

  function openModal() {
    setopen(true)
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/service/delete/${item._id}`);
      if (response.status === 200) {
        // console.log(response);
        setUpdate((prevValue) => !prevValue);
        closeModal();
      }
    } catch (err) {
      console.log(err);
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
                    {item.itemName}
                  </Dialog.Title>
                  <div className="capitalize space-y-2">
                    <h3>brand : {item.brand}</h3>
                    <p className="text-sm text-gray-500">
                      {item.itemDescription}
                    </p>
                    <p>price = ₹{item.price} </p>
                  </div>
                  {
                    userInfo.role.toLowerCase() === 'admin' &&
                    <div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className={buttonStyle}
                          onClick={() => navigate('/servicehub/update', { state: { item } })}
                        >
                          update
                        </button>
                        <button
                          type="button"
                          className={buttonStyle}
                          onClick={handleDelete}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  }

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default TableModal;
