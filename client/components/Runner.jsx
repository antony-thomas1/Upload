import React from 'react'
import Image from 'next/image'
import swift from '../assets/Swift_logo.png'
import cubic from '../assets/cubic_logo.png'
import neon from '../assets/Neon_logo.png'
import mirage from '../assets/Mirage_logo.png'
import Marquee from "react-fast-marquee";

const Runner = () => {
  return (
    <div className='pt-[50px] pb-[30px]'>
            <Marquee

             loop={0}
             speed={40}
             gradientColor={[9,22,60]}
             gradientWidth={400}
            >
                <Image src={swift} alt='swift' height={140} width={140} loading="lazy" className='mr-[200px]'/>

                <Image src={cubic} alt='cubic' height={160} width={160} loading="lazy" className='mr-[200px]'/>

                <Image src={neon} alt='neon' height={170} width={170} loading="lazy" className='mr-[200px]'/>

                <Image src={mirage} alt='mirage' height={200} width={200} loading="lazy" className='mr-[200px]'/>
            </Marquee>
    </div>
  )
}

export default Runner