import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
const activeChain = "fantom-testnet";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
