import { useEffect } from "react";
import { addNetwork, NETWORK_ID, readyToTransact } from "../helpers";
import { initOnboard } from "../services";
import { useWalletStore } from "../stores";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const {
    onboard,
    wallet,
    setAddress,
    setNetwork,
    setBalance,
    setWallet,
    setOnboard,
  } = useWalletStore();

  useEffect(() => {
    if (wallet?.provider) {
      addNetwork(NETWORK_ID);
    }
  }, [wallet]);

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: setBalance,
      wallet: (wallet) => {
        if (wallet.provider) {
          setWallet(wallet);
          window.localStorage.setItem("selectedWallet", wallet.name);
        } else {
          setWallet();
        }
      },
    });

    setOnboard(onboard);
  }, []);

  useEffect(() => {
    const previouslySelectedWallet =
      window.localStorage.getItem("selectedWallet");

    if (previouslySelectedWallet && onboard) {
      readyToTransact(onboard, previouslySelectedWallet);
    }
  }, [onboard]);

  return (
    <div className="p-5">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
