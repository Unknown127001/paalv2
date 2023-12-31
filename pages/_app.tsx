import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  trustWallet,
  zerionWallet,
  frameWallet,
  rainbowWallet,
} from "@thirdweb-dev/react";
import { useState, useContext } from "react";
import ChainContext from "../context/Chain";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState("binance");
  const [relayerUrl, setRelayerUrl] = useState("");
  const excludeSdkOptionsPages = ["/claim", "/migration", "/staking"];
  const router = useRouter();

  useEffect(() => {
    if (selectedChain === "binance") {
      setRelayerUrl(
        "https://api.defender.openzeppelin.com/autotasks/7e8747bf-9224-4044-a473-cf97b9eda8ca/runs/webhook/a6477a7a-f7ab-4c88-a336-d25888b3ed0f/VNvuPADuWWevk4SsVKv37F"
      );
    } else if (selectedChain === "ethereum") {
      setRelayerUrl(
        "https://api.defender.openzeppelin.com/autotasks/9eefb702-7029-449d-9749-21cd7e9fac73/runs/webhook/a6477a7a-f7ab-4c88-a336-d25888b3ed0f/JeZz6zkUbujDwh2q4oTAbF"
      );
    }
  }, [selectedChain]);

  const shouldExcludeSdkOptions = excludeSdkOptionsPages.includes(
    router.pathname
  );

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={selectedChain}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ],
        }),
        trustWallet(),
        zerionWallet(),
        frameWallet(),
        rainbowWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
    </ChainContext.Provider>
  );
}

export default MyApp;