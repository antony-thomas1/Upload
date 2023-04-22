import React from 'react'
import Image from 'next/image'
import doc from '../assets/file.png'

const FileCard = ({name, handleClick}) => {
  return (
    <div className="justify-center items-center w-[130px] text-center p-[20px] bg-transparent hover:bg-[#2682ec] hover:border-[1px] border-white cursor-pointer rounded-[20px]" onClick={handleClick}>
        <Image src={doc} height={90} width={90} alt='file'/>
        <h3 className="font-poppins mt-[10px] font-medium text-[18px] text-white leading-[26px] truncate">
          {name}
        </h3>
    </div>
  )
}

export default FileCard