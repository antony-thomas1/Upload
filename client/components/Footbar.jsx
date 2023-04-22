import React from 'react'
import Image from 'next/image'
import sign from '../assets/sign.png'

const Footbar = () => {
  return (
    <div className='w-full h-[200px] bg-transparent flex sm:flex-row flex-col justify-evenly items-center px-10 pt-[20px] mt-5'>
          <div className='flex justify-center items-center '>
            <Image src={sign} alt='sign' className=' object-contain' width={200} height={190} />
          </div>

          <div className='flex flex-col justify-center items-center text-center'>
            <h4 className='font-poppins font-normal text-white text-[20px]'>Contact:</h4>
            <h4 className='font-poppins font-normal text-white text-[20px] '>antonythomas@tutanota.com</h4>
          </div>

          <div className='flex flex-col justify-center items-center text-center'>
            <h4 className='font-poppins font-normal text-white text-[20px]'>All Rights Reserved</h4>
          </div>
        </div>
  )
}

export default Footbar