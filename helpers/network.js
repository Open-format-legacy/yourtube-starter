import networks from "./networkParams.json";

const NETWORK_ID = 80001;

async function addNetwork(networkID) {
  let params;
  switch (networkID) {
    case 80001:
      params = networks?.polygon_mumbai;
      break;
    case 137:
      params = networks?.polygon_mainnet;
      break;
    default:
      params = networks?.polygon_mumbai;
  }

  if (window.ethereum) {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params,
    });
  }
}

export { addNetwork, NETWORK_ID };
