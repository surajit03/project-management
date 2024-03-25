import React from 'react'
// import Nav from './Nav'
import Sidebar from './Sidebar'
import ANavebar from './ANavebar'
const AppLayout = ({ children }) => {
    return (
        <div className='bg-white'>
           {/* <Nav/> */}
           <ANavebar/>
            <div className=' w-screen flex container mx-auto' style={{ height: 'calc(100vh - 56px)' }}>
                <div className="w-[220px]">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <div className="flex">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default AppLayout