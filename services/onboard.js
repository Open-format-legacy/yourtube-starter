import Onboard from "bnc-onboard";

const networkId = 80001;
const networkName = "mumbai";

export default function initOnboard(subscriptions) {
  return Onboard({
    hideBranding: true,
    networkId,
    networkName,
    darkMode: false,
    subscriptions,
    walletSelect: {
      wallets: [{ walletName: "metamask" }],
    },
    walletCheck: [
      { checkName: "connect" },
      { checkName: "accounts" },
      { checkName: "network" },
    ],
  });
}
