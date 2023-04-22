import Image from 'next/image'
import spinner  from '../assets/spinner.svg'

const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center flex-col'>
        <Image src={spinner} alt='loader' className='w-[250px] h-[250px] object-contain'/>
        <p className='mt-[20px] font-epilogue font-bold text-[20px] text-center text-white'>
            Loading... Please wait...
        </p>
    </div>
  )
}

export default Loader