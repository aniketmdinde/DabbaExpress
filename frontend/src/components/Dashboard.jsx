import React, { useEffect } from 'react'

const Dashboard = () => {

    useEffect(()=>{
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
            },
            (error) => {
                console.error('Error fetching location', error);
            }
        )
    }, [])
  return (
    <div className='min-h-screen'>Dashboard</div>
  )
}

export default Dashboard