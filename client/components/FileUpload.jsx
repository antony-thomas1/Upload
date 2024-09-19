import React, { useEffect, useState } from 'react';
import { FileCard, Loader } from '../components';
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { createThirdwebClient, upload, download } from "thirdweb/storage";

// Initialize the client for IPFS storage
const client = createThirdwebClient({
  clientKey: "1a84efe6281671c4ff85abd9c276386f", // Thirdweb client key
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

  // Handle input field changes
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  // Function to upload file metadata to the smart contract
  const uploadFile = async (form) => {
    try {
      const data = await addFile([
        address, // owner
        form.name, // name
        form.link, // link to the file on IPFS
      ]);

      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  // Function to upload a file to IPFS and get the URL
  const uploadToIpfs = async () => {
    setIsLoading(true);
    try {
      const uploadUrl = await upload({
        client,
        files: [file],
      });

      form.link = uploadUrl[0]; // Use the first URL returned
      await uploadFile({ ...form }); // Upload the form to the contract
    } catch (error) {
      console.error("Error uploading file to IPFS", error);
    }
    setIsLoading(false);
    location.reload(); // Reload page after uploading
  };

  // Function to get files from the contract
  const getFile = async () => {
    try {
      const files = await contract.call('getFile');
      const parsedFiles = files.map((File, i) => ({
        owner: File.owner,
        name: File.name,
        link: File.link,
        pId: i,
      }));

      return parsedFiles;
    } catch (error) {
      console.error("Error fetching files from contract", error);
      return [];
    }
  };

  // Fetch files uploaded by the current user
  const getUserFile = async () => {
    const allFiles = await getFile();
    const filteredFiles = allFiles.filter((File) => File.owner === address);
    return filteredFiles;
  };

  // Fetch user files on component mount
  const fetchFiles = async () => {
    setIsLoading(true);
    const data = await getUserFile();
    setContractFiles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchFiles();
  }, [address, contract]);

  return (
    <div className="my-[30px] flex justify-center items-center">
      <div className="w-full min-h-screen p-[20px]">
        <div className="flex justify-center items-center gap-[30px]">
          <div className="w-screen mx-[20px] h-[500px] ml-[50px]">
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
          <div className="flex-1 justify-center items-center gap-10 w-[300px] h-[500px] p-[5px] mr-[40px] mt-[60px]">
            <input
              className="py-[15px] px-[15px] mt-[10px] w-full outline-none border-[1px] border-[#79797e] bg-transparent font-epilogue text-white text-[16px] placeholder:text-[#79797e] rounded-[10px]"
              type="text"
              placeholder="File name"
              value={form.name}
              onChange={(e) => handleFormFieldChange('name', e)}
            />
            <input
              className="py-[15px] px-[15px] mt-[10px] outline-none border-[1px] border-[#79797e] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#79797e] rounded-[10px]"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="justify-center items-center my-[10px] px-[80px]">
              <button
                className="px-[20px] py-[10px] bg-[#2682ec] rounded-[12px] text-white font-bold font-poppins text-[18px]"
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
