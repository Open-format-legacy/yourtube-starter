async function readyToTransact(onboard, previouslySelectedWallet) {
  if (onboard) {
    await onboard.walletSelect(previouslySelectedWallet);
    await onboard.walletCheck();
  }
}

export { readyToTransact };
