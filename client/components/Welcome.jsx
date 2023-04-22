import React from 'react'
import Image from 'next/image'
import hero from '../assets/hero.png'
import Runner from './Runner'

const Welcome = () => {
  return (
    <div>
        <div className='text-end px-[50px]'>
            <h1 className='text-white text-[18px] font-semibold font-poppins '>
                Get some Fantom test coins 
                <a href='https://faucet.fantom.network/'>
                    <span className='text-[#2682ec]'> HERE </span>
                </a>
                !
            </h1>
        </div>
        <div className='flex justify-center items-center text-center gap-[50px] p-[50px]'>
            <div className=' text-white text-[30px] font-semibold font-poppins'>
                Want an alternative for <span className='text-[#2682ec]'>Google Drive</span>?<br/>
                Use <span className='text-[#2682ec]'>Upload</span> - a Decentralized platform<br/>
                to upload your files to <span className='text-[#2682ec]'>IPFS</span>.<br/>
                Track your files by connecting to <br/>
                <span className='text-[#2682ec]'>MetaMask</span> wallet. Do have some Fantom<br/>
                test coins to upload the files? If not <br/>get some Fantom test coins
                <a href='https://faucet.fantom.network/'>
                    <span className='text-[#2682ec]'> HERE </span>
                </a>
                !
            </div>
            <Image src={hero} alt='hero' height={400} width={400}/>
        </div>
        <h3 className='mt-[30px] text-center text-[40px] text-white font-poppins font-bold'>
            Trusted Partners
        </h3>
        <Runner/>
    </div>
  )
}

export default Welcome