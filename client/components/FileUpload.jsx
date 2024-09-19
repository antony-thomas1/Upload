import React from 'react';
import { useEffect, useState } from 'react';
import { FileCard, Loader } from '../components';
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { upload as thirdwebUpload } from 'thirdweb/storage';
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientKey: "1a84efe6281671c4ff85abd9c276386f",
});

const FileUpload = () => {
  const address = useAddress();
  const { contract } = useContract('0x106BD8B9B49E7410305a185D97AF06586feEa161');
  const { mutateAsync: addFile } = useContractWrite(contract, 'addFile');

  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [contractFiles, setContractFiles] = useState('');
  const [form, setForm] = useState({
    name: '',
    link: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const uploadFile = async (form) => {
    try {
      const data = await addFile([
        address, // owner
        form.name, // name
        form.link, // link
      ]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const uploadToIpfs = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    
    setIsLoading(true);
    try {
      // Upload file to IPFS using thirdweb's storage API
      const uri = await thirdwebUpload({
        client: undefined, // Provide a valid client if necessary
        files: [file],
      });
      
      console.info('IPFS URI:', uri);

      // Resolve the gateway URL (if needed)
      const url = `https://ipfs.thirdwebstorage.com/ipfs/${uri.split('://')[1]}/0`;
      console.info('Gateway URL:', url);

      // Update form with the IPFS URL and upload to contract
      form.link = url;
      await uploadFile({ ...form });
    } catch (error) {
      console.error("IPFS upload failed", error);
    } finally {
      setIsLoading(false);
      location.reload(); // Reload the page after upload
    }
  };

  const getFile = async () => {
    const files = await contract.call('getFile');
    const parsedFiles = files.map((File, i) => ({
      owner: File.owner,
      name: File.name,
      link: File.link,
      pId: i,
    }));

    return parsedFiles;
  };

  const getUserFile = async () => {
    const allfiles = await getFile();
    const filteredFiles = allfiles.filter((File) => File.owner === address);
    return filteredFiles;
  };

  const FetchFiles = async () => {
    const data = await getUserFile();
    setIsLoading(true);
    setContractFiles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) FetchFiles();
  }, [address, contract]);

  return (
    <div className='my-[30px] flex justify-center items-center '>
      <div className='w-full min-h-screen p-[20px]'>
        <div className='flex justify-center items-center gap-[30px]'>
          <div className='w-screen mx-[20px] h-[500px] ml-[50px]'>
            <h1 className="font-poppins font-semibold text-[20px] text-white text-left">
              All Files ({contractFiles.length})
            </h1>
            <div className="flex flex-wrap mt-[20px] gap-[26px]">
              {isLoading && <Loader />}
              {!isLoading && contractFiles.length === 0 && (
                <p className="font-poppins font-semibold text-[14px] leading-[30px] text-[#818183]">
                  You have not uploaded any file yet
                </p>
              )}
              {!isLoading && contractFiles.length > 0 && contractFiles.map((File) => (
                <FileCard
                  key={File.pId}
                  {...File}
                  handleClick={() => window.open(File.link, '_blank')}
                />
              ))}
            </div>
          </div>
          <div className='flex-1 justify-center items-center gap-10 w-[300px] h-[500px] p-[5px] mr-[40px] mt-[60px]'>
            <input
              className='py-[15px] px-[15px] mt-[10px] w-full outline-none border-[1px] border-[#79797e] bg-transparent font-epilogue text-white text-[16px] placeholder:text-[#79797e] rounded-[10px]'
              type="text"
              placeholder='File name'
              value={form.name}
              onChange={(e) => handleFormFieldChange('name', e)}
            />
            <input
              className='py-[15px] px-[15px] mt-[10px] outline-none border-[1px] border-[#79797e] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#79797e] rounded-[10px]'
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className='justify-center items-center my-[10px] px-[80px]'>
              <button
                className='px-[20px] py-[10px] bg-[#2682ec] rounded-[12px] text-white font-bold font-poppins text-[18px]'
                onClick={uploadToIpfs}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
