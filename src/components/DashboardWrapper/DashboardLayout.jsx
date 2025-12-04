import React, { Children } from 'react'
import ModernExpenseSidebar from '../Sidebar/Sidebar'

const DashboardLayout = ({children}) => {
  return (
    <div className='flex min-h-screen bg-base-100 h-screen overflow-hidden'>
        <div className='h-screen bg-base-100 border-r border-base-300 shrink-0'>
            <ModernExpenseSidebar/>
        </div>

        {/* Main Content */}
        <div className='flex-1 min-w-0 h-screen overflow-y-auto'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout