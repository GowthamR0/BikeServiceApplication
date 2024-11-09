import React from 'react';
import homeImage from '../assets/homeimage.jpg';

const HomePage = () => {
    const SmallScreenHome = () => {
        return (
            <div className='text-white md:hidden pt-20 bg-black h-screen'>
                <h1 className='text-3xl p-2' id='ubuntu-bold'>Keep Your Wheels Rolling</h1>
                <h1 className='p-2 font-serif'>Ride Smoother, Ride Safe</h1>
                <div className='w-full' id='home-img'>
                    <img src={homeImage} className='w-full h-full rounded-b-full' alt="Home" />
                </div>
            </div>
        );
    }

    const LargeScreenHome = () => {

        const h1Style = 'p-2 text-white text-2xl font-serif';
        const divStyle = 'max-w-xl bg-white text-black p-5 rounded-2xl space-y-3 group-hover:opacity-80'
        const h3Style = 'text-2xl';
        const paraStyle = `text-xl`;

        const serviceHubText = `Your go-to platform for all things bike service. Book appointments, track repairs, and stay informed about your bike's maintenance effortlessly.`;
        const bookHubText = ` Your central hub for tracking all your bookings in one place. Stay updated on booking statuses and manage your reservations seamlessly.`;

        return (
            <div className='hidden md:block' id='outer-block'>
                <div className='relative -z-10' id='inner-block'>
                    <h1 className='text-5xl text-white p-2 pt-28' id='ubuntu-bold'>Keep Your Wheels Rolling</h1>
                    <h1 className={h1Style}>Ride Smoother, Ride Safe</h1>
                    <div className='text-white p-2 space-y-5'>
                        <div className={divStyle}>
                            <h3 className={h3Style}>BookHub</h3>
                            <p className={paraStyle}>{bookHubText}</p>
                        </div>
                        <div className={divStyle}>
                            <h3 className={h3Style}>ServiceHub</h3>
                            <p className={paraStyle}>{serviceHubText}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=''>
            <SmallScreenHome />
            <LargeScreenHome />
        </div>
    );
}

export default HomePage;
