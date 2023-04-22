import React from 'react'
import upload from '../assets/upload.png';
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from 'next/image'


const Navbar = () => {
  return (
    <div className='p-[20px] justify-between items-center flex'>
        <div className='flex pl-[50px]'>
            <Image className='mr-[12px]' alt='logo' src={upload} height={50} width={60}/>
            <h1 className='text-white text-[38px] font-epilogue font-bold pt-[5px]'>
                Upload
            </h1>
        </div>
        
        <div className='w-1/5 pr-[50px] '>
          <ConnectWallet
            accentColor="#2682ec"
            colorMode='dark'
          />
        </div>
    </div>
  )
}

export default Navbar