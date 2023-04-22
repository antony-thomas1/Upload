import { ConnectWallet, useAddress, useMetamask } from "@thirdweb-dev/react";
import Footbar from "../components/Footbar";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import Welcome from "../components/Welcome";
import Head from 'next/head'

export default function Home() {
  // const { address } = useStateContext();
  const address = useAddress();
  const connect = useMetamask();

  return (
    <div className="bg-[#09163c]">
      <Head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/upload.png" />
      <meta name="viewport" content="width=device-width, initial-scale=0.5" />
      <title>Upload</title>
      </Head>
      <main className="">
        <Navbar/>
        {/* <Welcome/> */}
        { address ? (<FileUpload/>) : (<Welcome/>)}
        <Footbar/>
      </main>
    </div>
  );
}
