import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import Gallery from "./pages/Gallery";
import WalletButton from "./components/WalletButton";
import Navbar from "./components/Navbar";
import "@rainbow-me/rainbowkit/styles.css";

const config = createConfig({
  autoConnect: true,
  publicClient: http(),
  chains: [sepolia],
});

function App() {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider chains={[sepolia]}>
        <WalletButton />
        <Navbar />
        <Gallery />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
