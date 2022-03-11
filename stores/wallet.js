import create from "zustand";

export default create((set) => ({
  owner: "",
  saleIsActive: true,
  onboard: null,
  notify: null,
  address: "",
  network: "",
  balance: "",
  wallet: {},
  setSaleIsActive: (item) => set({ saleIsActive: item }),
  setOwner: (item) => set({ owner: item }),
  setNotify: (item) => set({ notify: item }),
  setAddress: (item) => set({ address: item }),
  setNetwork: (item) => set({ network: item }),
  setBalance: (item) => set({ balance: item }),
  setWallet: (item) => set({ wallet: item }),
  setOnboard: (item) => set({ onboard: item }),
  resetWallet: () =>
    set({ address: "", network: "", balance: "", wallet: {} }),
}));
