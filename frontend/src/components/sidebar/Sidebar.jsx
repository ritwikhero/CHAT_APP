import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
const Sidebar = () => {
  return (
    <div>
        <SearchInput />
        <Conversations />
        <div className='divider px-3'></div>
         
        {/* <Logout /> */} 
    </div>
  )
}

export default Sidebar