import { useRouter } from "next/router";
import { Button, Input } from "../components";
import { useWalletStore } from "../stores";

export default function Header() {
  const { address, onboard, resetWallet } = useWalletStore();
  const router = useRouter();

  async function connect() {
    try {
      if (onboard) {
        await onboard.walletSelect();
        await onboard.walletCheck();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleReset() {
    window.localStorage.removeItem("selectedWallet");
    resetWallet();

    await onboard.walletReset();
  }

  return (
    <header className="w-full py-2 px-2">
      <div className="flex items-center justify-between">
        <div>
          <div
            onClick={() => router.push("/")}
            className="w-6 bg-indigo-500 hover:bg-indigo-900 cursor-pointer h-6 rounded-full p-6 flex justify-center text-white items-center"
          >
            YS
          </div>
        </div>
        <div className="flex-1 px-2">
          <Input name="search" placeholder="Search..." />
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => router.push("/new")}>
            Add video
          </Button>
          {address ? (
            <div className="flex flex-col items-center space-y-5 py-2 md:flex-row md:space-x-3 md:space-y-0 md:py-0">
              <Button onClick={handleReset}>Disconnect</Button>
              <p className="font-semibold">
                {address.slice(0, 4)}...{address.slice(-4)}
              </p>
            </div>
          ) : (
            <Button onClick={connect}>Connect</Button>
          )}
        </div>
      </div>
    </header>
  );
}
