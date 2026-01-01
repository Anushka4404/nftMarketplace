"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//INTERNAL IMPORT
import Style from "./connectWallet.module.css";
import images from "../../../img";

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const connectWallet = () => {
  const router = useRouter();
  const { connectWallet, currentAccount } = useContext(NFTMarketplaceContext);
  const [activeBtn, setActiveBtn] = useState(1);
  
  const providerArray = [
    {
      provider: images.provider1,
      name: "Metamask",
      connect: async () => {
        if (connectWallet) {
          await connectWallet();
          // Redirect to home page after successful connection
          if (currentAccount) {
            router.push("/");
          }
        }
      },
    },
    {
      provider: images.provider2,
      name: "walletConnect",
      connect: () => alert("WalletConnect integration coming soon"),
    },
    {
      provider: images.provider3,
      name: "walletlink",
      connect: () => alert("WalletLink integration coming soon"),
    },
    {
      provider: images.provider1,
      name: "Formatic",
      connect: () => alert("Formatic integration coming soon"),
    },
  ];

  // Redirect if already connected
  useEffect(() => {
    if (currentAccount) {
      router.push("/");
    }
  }, [currentAccount, router]);

  const handleProviderClick = async (provider, index) => {
    setActiveBtn(index + 1);
    if (provider.connect) {
      await provider.connect();
    }
  };

  return (
    <div className={Style.connectWallet}>
      <div className={Style.connectWallet_box}>
        <h1>Connect your wallet</h1>
        <p className={Style.connectWallet_box_para}>
          Connect with one of our avaliabl wallet providers or create a new one
        </p>

        <div className={Style.connectWallet_box_provider}>
          {providerArray.map((el, i) => (
            <div
              className={`${Style.connectWallet_box_provider_item} ${
                activeBtn == i + 1 ? Style.active : ""
              }`}
              key={i + 1}
              // onClick={() => handleProviderClick(el, i)}
              onClick={() => (setActiveBtn(el, i), connectWallet())}
            >
              <Image
                src={el.provider}
                alt={el.provider}
                width={50}
                height={50}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connectWallet;