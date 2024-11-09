import './App.css';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './Components/HomePage';
import DefaultLayout from './Layout/DefaultLayout';
import BookHub from './Components/CartAndOrder/BookHub';
import ServiceHub from './Components/Services/ServiceHub';
import ProfilePage from './Components/ProfilePage';
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import MyModal from './Components/Modals/TableModal';
import PrivateRoute from './Components/Routes/PrivateRoute';
import ServiceCreation from './Components/Services/ServiceCreation';
import AdminRoute from './Components/Routes/AdminRoute';

import ServiceUpdation from './Components/Services/ServiceUpdation';
import ServiceBooking from './Components/Services/ServiceBooking';
import AdminOrder from './Components/CartAndOrder/AdminOrder'
import AdminCart from './Components/CartAndOrder/AdminCart';
import UserOrder from './Components/CartAndOrder/UserOrder';
import { useEffect, useState } from 'react';
import Loader from './Components/Loader';
import { useAuth } from './Context/AuthenticationContext';

function App() {


  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 2000)

  return (
    <>
      {loader ? <Loader /> :

        <Routes>
          <Route path='/' exact element={<DefaultLayout><HomePage /></DefaultLayout>} />
          <Route path='/profile' exact element={<ProfilePage />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<Signup />} />

          {/* sevicehub */}
          <Route path='/servicehub' exact element={<PrivateRoute><DefaultLayout><ServiceHub /></DefaultLayout></PrivateRoute>} />
          <Route path='/servicehub/create' exact element={<AdminRoute><DefaultLayout><ServiceCreation /></DefaultLayout></AdminRoute>} />
          <Route path='/servicehub/update' exact element={<AdminRoute><DefaultLayout><ServiceUpdation /></DefaultLayout></AdminRoute>} />
          <Route path='/servicehub/booking' exact element={<PrivateRoute><DefaultLayout><ServiceBooking /></DefaultLayout></PrivateRoute>} />

          {/* bookhub */}
          <Route path='/bookhub' exact element={<PrivateRoute><DefaultLayout><BookHub /></DefaultLayout></PrivateRoute>} />

          <Route path='/orders' exact element={<PrivateRoute><DefaultLayout><UserOrder /></DefaultLayout></PrivateRoute>} />

          <Route path='/adminOrders' exact element={<AdminRoute><DefaultLayout><AdminOrder /></DefaultLayout></AdminRoute>} />

          <Route path='/resendotp' exact element={<MyModal />} />
        </Routes>
      }
    </>
  )
}

export default App;
