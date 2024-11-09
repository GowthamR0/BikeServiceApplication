import React from 'react'

//react icons
import { MdSwitchAccount } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const DefaultLayout = ({ children }) => {

    //navigate hook for navigating to differentb route
    const navigate = useNavigate();

    //handling the profile button
    const handleProfileButton = () => {
        navigate('/profile');
    }

    const SmallScreenNavbar = () => {

        const divStyle = `flex items-center justify-between p-3`;
        const headingStyle = `text-2xl xm:text-3xl capitalize cursor-pointer`;
        const iconStyle = `text-4xl sm:text-4xl`;

        return (
            <div className='text-green-50 md:hidden fixed w-full ' style={{ backgroundColor: '#252424' }}>
                <div className={divStyle}>
                    {/* brandname */}
                    <h1 className={headingStyle} id='anta-regular' onClick={() => navigate('/')}>riderevive</h1>

                    {/* accounts button */}
                    <div className={iconStyle} onClick={handleProfileButton}>
                        <MdSwitchAccount />
                    </div>
                </div>
            </div>
        )
    }

    const LargeScreenNavbar = () => {

        const parentDivStyle = `flex items-center justify-between p-3`;
        const h1Style = `text-4xl xm:text-3xl capitalize cursor-pointer`;
        const childDivStyle = `text-2xl flex flex-row gap-10 capitalize`;
        const iconStyle = `text-4xl`;

        return (
            <div className='text-green-50 hidden fixed md:block  w-full' style={{ backgroundColor: '#252424' }}>
                <div className={parentDivStyle}>
                    {/* brandname */}
                    <h1 className={h1Style} id='anta-regular' onClick={() => navigate('/')}>riderevive</h1>

                    <div className='flex flex-row gap-10'>
                        <h3 className='capitalize text-2xl cursor-pointer ' onClick={() => navigate('/servicehub')}>servicehub</h3>
                        <h1 className='capitalize text-2xl cursor-pointer' onClick={() => navigate('/bookhub')}>bookhub</h1>
                        {/* accounts button */}
                        <div className={iconStyle} onClick={handleProfileButton} id="roboto-thin">
                            <MdSwitchAccount />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const SmallScreenBottomNavbar = () => {
        const divStyle = `text-green-50 flex`;
        const h1Style = `border-b-4 text-xl capitalize `;
        const buttonStyle = `w-1/2 flex flex-col items-center py-4 space-y-2`;

        //handling the servicehub button
        const handleServiceHub = () => {
            navigate('/servicehub');
        }

        //handling the servicehub button
        const handleBookHub = () => {
            navigate('/bookhub');
        }

        return (
            <div className='fixed bottom-0 w-full md:hidden' id='ubuntu-bold'>
                <div className={divStyle} style={{ backgroundColor: '#252424' }}>

                    {/* servicehub button */}
                    <button className={buttonStyle} onClick={handleServiceHub}>
                        <div className='text-3xl'>
                            <MdDesignServices />
                        </div>
                        <h1 className={h1Style}>servicehub</h1>
                    </button>

                    {/* bookhub button */}
                    <button className={buttonStyle} onClick={handleBookHub}>
                        <div className='text-3xl'>
                            <FaShoppingCart />
                        </div>
                        <h1 className={h1Style}>bookhub</h1>
                    </button>
                </div>
            </div>
        )

    }

    return (
        <div className=' relative md:bg-inherit'>
            <SmallScreenNavbar />
            <LargeScreenNavbar />
            {children}
            <SmallScreenBottomNavbar />
        </div>
    )
}

export default DefaultLayout