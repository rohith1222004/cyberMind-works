"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
function TopBar() {
  const router = useRouter()
  return (
    <div className='justify-center flex'>
      <div className='w-3/5 h-20 flex items-center justify-evenly rounded-full border-2'>
        <div>
          <Image src={'/logo.png'} width={50} height={50}/>
        </div>
        <h2>Home</h2>
        <h2>Find Jobs</h2>
        <h2>Find Talents</h2>
        <h2>About us</h2>
        <h2>Testimonials</h2>
        <button className='w-32  bg-gradient-to-b from-purple-500 to-purple-800 bg-purple-700 h-10 rounded-full text-white' onClick={() =>router.push('/form')}>Create Jobs</button>
      </div>
    </div>
  )
}

export default TopBar