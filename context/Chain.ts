import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: "ethereum",
  setSelectedChain: (chain: string) => {},
});

export default ChainContext;