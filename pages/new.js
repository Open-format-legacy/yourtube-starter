import { ethers } from "ethers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FactoryContract from "../abis/theFactory.json";
import { Button, Header } from "../components";
import { buildMetadata, uploadToIPFS } from "../helpers";
import { useWalletStore } from "../stores";

export default function NewVideoPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { wallet, address } = useWalletStore();
  const [isLoading, setLoading] = useState(false);
  const [txSuccessful, setTxSuccessful] = useState(false);

  async function createVideo(data) {
    setLoading(true);

    // Descontrust form data
    const { name, description, video, image } = data;

    // Pass through the form data to build up the metadata object
    const metadata = buildMetadata(
      name,
      description,
      image[0],
      video[0]
    );

    console.log({ metadata });

    // Upload the metdata object returned from the buildMetadata function to IPFS
    const ipfsData = await uploadToIPFS(metadata);

    console.log({ ipfsData });

    // If the user has connected their wallet, continue.
    if (wallet?.provider) {
      try {
        // The provider allows us to interact with the blockchain and

        const provider = new ethers.providers.Web3Provider(
          wallet.provider
        );

        // Every transasction needs to be signed. In this case, the signer is the connected wallet.
        const signer = provider.getSigner();

        // create an instance of the factory contract with the ABI, Bytecode and Signer.
        const factory = new ethers.ContractFactory(
          FactoryContract.abi,
          FactoryContract.bytecode,
          signer
        );

        // call the deploy function on the factory contract
        const contract = await factory.deploy(
          [address], // Payees - Required, but it's not used for this application
          [100], // Shares - Required, but it's not used for this application
          0, // salePrice -Required, but it's not used for this application
          name, // name - Required, The name of the video
          "VIDEO", // symbol - The blockchain identifier for this NFT contract
          0, // quantity - Required, but it's not used for this application
          0, // royaltiesPercentage - Required, but it's not used for this application
          ipfsData.url // URL - Required, a IPFS url to the metdata.
        );

        // Once, the transaction has been confirmed in Metamask, we wait for it to be successful.
        await contract.deployTransaction.wait();
        setLoading(false);
        setTxSuccessful(true);
      } catch (e) {
        setLoading(false);
        console.log({ e });
      }
    }
  }

  return (
    <div>
      <Header />
      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmit(createVideo)}
      >
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Video name"
        />
        {errors.name && (
          <p className="text-red-500">Name is required.</p>
        )}
        <input
          {...register("description", { required: true })}
          type="text"
          placeholder="Video description"
        />
        {errors.description && (
          <p className="text-red-500">Description is required.</p>
        )}
        <label>Add Preview Image</label>
        <input
          {...register("image", { required: true })}
          type="file"
          accept=".png,.jpg,.jpeg"
        />
        {errors.image && (
          <p className="text-red-500">Preview image is required.</p>
        )}
        <label>Add Video File</label>
        <input
          {...register("video", { required: true })}
          type="file"
          accept=".mp4"
        />
        {errors.video && (
          <p className="text-red-500">Video is required.</p>
        )}
        <div>
          <Button
            isLoading={isLoading}
            disabled={isLoading || !address}
            type="submit"
          >
            {txSuccessful ? "Success 🎉" : "Submit"}
          </Button>
          {!address && <p>Please connect your wallet.</p>}
        </div>
      </form>
    </div>
  );
}
