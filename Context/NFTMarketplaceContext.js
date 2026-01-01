"use client";
import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract, parseUnits, formatUnits, JsonRpcProvider } from "ethers";
import axios from "axios";
import { useRouter } from "next/navigation";
// INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";


// ---- FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => new Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);

// ---- CONNECT WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return null;
    }
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return fetchContract(signer);
  } catch (error) {
    console.log("Error connecting smart contract:", error);
    return null;
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";

  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);

  const router = useRouter();

  // CHECK IF WALLET IS CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) 
        return setOpenError(true),
        setError("Install MetaMask");
      
      const accounts = await window.ethereum.request({ method: "eth_accounts", });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setError("No Accounts Found");
        setOpenError(true);
      }
    } catch (error) {
      setError("Something wrong while conneccting to wallet!");
      setOpenError(true);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // CONNECT WALLET
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return (
        setOpenError(true),
        setError("Please install MetaMask")
      )
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      console.log("Connected Address:", accounts[0]);
    } catch (error) {
      if (error.code === -32002) {
        alert("MetaMask request already open. Open MetaMask and approve it.");
      } else {
        setError("Error while connecting");
        setOpenError(true);
       // console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("Account updated:", currentAccount);
  }, [currentAccount]);

  // -----------------------------
  // UPLOAD TO IPFS VIA API ROUTE
  // -----------------------------
  // const uploadToIPFS = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const res = await fetch("/api/uploadNFT", { method: "POST", body: formData });
  //     if (!res.ok) {
  //       const txt = await res.text().catch(() => "");
  //       throw new Error("Failed to upload file to IPFS: " + txt);
  //     }
  //     const data = await res.json();
  //     return data.url;
  //   } catch (error) {
  //     console.log("IPFS upload error:", error);
  //     return null;
  //   }
  // };
  const uploadToIPFS = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadNFT", { method: "POST", body: formData });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error("Failed to upload file to IPFS: " + txt);
    }
    const data = await res.json();
    return data.url;
  } catch (error) {
    setError("IPFS upload error:", error);
    setOpenError(true);
    //return null;
  }
};


  // -----------------------------
  // CREATE NFT (upload image → upload metadata → open MetaMask)
  // -----------------------------
  // params: image is the File input from the client
  // const createNFT = async (name, price, imageFile, description, router) => {
  //   if (!name || !description || !price || !imageFile) {
  //     console.log("Data missing!");
  //     return;
  //   }

  //   try {
  //     // 1) Upload image file to your API route (Pinata)
  //     const fileUrl = await uploadToIPFS(imageFile);
  //     if (!fileUrl) throw new Error("Image upload failed");

  //     // 2) Create metadata and upload it
  //     const metadata = JSON.stringify({
  //       name,
  //       description,
  //       image: fileUrl,
  //     });
  //     const metadataBlob = new Blob([metadata], { type: "application/json" });
  //     const metadataFile = new File([metadataBlob], "metadata.json");
  //     // {
  //   //   type: "application/json"
  //   // });

  //     const metadataUrl = await uploadToIPFS(metadataFile);
  //     if (!metadataUrl) throw new Error("Metadata upload failed");

  //     // 3) Create sale (this triggers MetaMask)
  //     await createSale(metadataUrl, price);
  //   } catch (error) {
  //     console.log("Error creating NFT:", error);
  //   }
  // };

  const createNFT = async (name, price, imageFile, description) => {
  if (!name || !description || !price || !imageFile) {
    return setError("Data missing!"), setOpenError(true);
  }

  try {
    // 1 → Upload image
    const fileUrl = await uploadToIPFS(imageFile);
    if (!fileUrl) throw new Error("Image upload failed");

    // 2 → Metadata
    const metadataObj = {
      name,
      description,
      image: fileUrl,
    };

    const metadataBlob = new Blob(
      [JSON.stringify(metadataObj)],
      { type: "application/json" }
    );

    const metadataFile = new File(
      [metadataBlob],
      "metadata.json",
      { type: "application/json" }
    );

    const metadataUrl = await uploadToIPFS(metadataFile);
    if (!metadataUrl) throw new Error("Metadata upload failed");

    // 3 → Trigger smart contract
    await createSale(metadataUrl, price);
    router.push('/search');
  } catch (error) {
    setError("Error creating NFT:")
    setOpenError(true);
  }
};

  // -----------------------------
  // CREATE SALE (mint or resell)
  // const createSale = async (url, formInputPrice, isReselling = false, id = null) => {
  //   try {
  //     const contract = await connectingWithSmartContract();
  //     if (!contract) throw new Error("No contract (connect wallet?)");

  //     const price = parseUnits(formInputPrice.toString(), "ether");

  //     let listingPrice=0;
  //     if (typeof contract.getListingPrice === "function") {
  //       listingPrice = await contract.getListingPrice();
  //     } else if (typeof contract.listingPrice === "function") {
  //       // if contract exposes public variable listingPrice()
  //       listingPrice = await contract.listingPrice();
  //     } 
  //     // else {
  //     //   // fallback to 0 if not found (but contract expects msg.value, so this will likely fail)
  //     //   listingPrice = 0;
  //     //   console.warn("Listing price getter not found on contract, using 0 as fallback");
  //     // }

  //     //const listingPriceValue = listingPrice ? listingPrice.toString() : "0";
  //     const listingPriceValue = BigInt(listingPrice);

  //     let transaction;
  //     if (!isReselling) {
  //       // createToken(tokenURI, price) payable -> contract.createMarketItem will check msg.value == listingPrice
  //       transaction = await contract.createToken(url, price, { value: listingPriceValue });
  //     } else {
  //       // reSellToken(tokenId, price) payable
  //       if (id === null) throw new Error("Token id required for reselling");
  //       transaction = await contract.reSellToken(id, price, { value: listingPriceValue });
  //     }

  //     console.log("Waiting for transaction confirmation...");
  //     await transaction.wait();
  //     console.log("Transaction confirmed:", transaction.hash);
  //   } catch (error) {
  //     console.log("Error while creating sale", error);
  //   }
  // };


 const createSale = async (url, formInputPrice, isReselling = false, id = null) => {
  try {
    const contract = await connectingWithSmartContract();
    if (!contract) throw new Error("No contract (connect wallet?)");

    const price = parseUnits(formInputPrice.toString(), "ether");
    let listingPrice = await contract.getListingPrice();
    const listingPriceValue = BigInt(listingPrice.toString());

    let transaction;
    if (!isReselling) {
      transaction = await contract.createToken(url, price, {
        value: listingPriceValue,
      });
    } else {
      if (id === null) throw new Error("Token id required for reselling");
      transaction = await contract.reSellToken(id, price, {
        value: listingPriceValue,
      });
    }

    await transaction.wait();
    console.log("Transaction confirmed:", transaction);
    router.refresh();
    // router.push('/search');
  } catch (error) {
    setError("Error while creating sale");
    setOpenError(true);
  }
};



  // -----------------------------
  // FETCH NFTs (market)
  // -----------------------------
  
  
  const fetchNFTS = async () => {
    try {
      const provider = new JsonRpcProvider("http://127.0.0.1:8545");
      const contract = fetchContract(provider);

      // solidity function name is fetchMarket()
      const data = await contract.fetchMarket();

      const items = await Promise.all(
        data.map(async (item) => {
          // item is a MarketItem struct (tokenId, seller, owner, price, sold)
          const tokenId = Number(item.tokenId.toString());
          const seller = item.seller;
          const owner = item.owner;
          const price = formatUnits(item.price.toString(), "ether");
          const tokenURI = await contract.tokenURI(tokenId);

          const { data: metadata } = await axios.get(tokenURI).catch(() => ({ data: {} }));
         

          return {
            tokenId,
            seller,
            owner,
            price,
            image: metadata.image ?? "",
            name: metadata.name ?? "",
            description: metadata.description ?? "",
            tokenURI,
          };
        })
      );
      setNfts(items);
      return items;
    } catch (error) {
      setError("Error while fetching NFTs");
      setOpenError(true);
      return [];
    }
  };

  useEffect(()=> {
    fetchNFTS();
  }, [currentAccount]);

  // -----------------------------
  // FETCH MY NFTs or LISTED
  // -----------------------------
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      // solidity: fetchMyNFT() or fetchItemsListed()
      // let data;
      // if (type === "listed") {
      //   data = await contract.fetchItemsListed();
      // } else {
      //   data = await contract.fetchMyNFT();
      // }

      const data = type === "listed" ? await contract.fetchItemsListed() : await contract.fetchMyNFT();

      const items = await Promise.all(
        data.map(async (item) => {
          const tokenId = Number(item.tokenId.toString());
          const seller = item.seller;
          const owner = item.owner;
          const price = formatUnits(item.price.toString(), "ether");
          const tokenURI = await contract.tokenURI(tokenId);

          const { data: metadata } = await axios.get(tokenURI).catch(() => ({ data: {} }));
          return {
            tokenId,
            seller,
            owner,
             price,
            image: metadata.image ?? "",
            name: metadata.name ?? "",
            description: metadata.description ?? "",
            tokenURI,
          };
        })
      );

      return items;
    } catch (error) {
      setError("Error fetching my NFTs:");
      setOpenError(true);
      return [];
    }
  };

  // useEffect(()=> {
  //   fetchMyNFTsOrListedNFTs()
  // },[]);


const loadAuthorNFTs = async () => {
  if (!currentAccount) return;

  const owned = await fetchMyNFTsOrListedNFTs("myNFTs");
  const listed = await fetchMyNFTsOrListedNFTs("listed");

  setMyNFTs(owned);
  setListedNFTs(listed);
};

// useEffect(() => {
//   if (currentAccount) {
//     fetchMyNFTsOrListedNFTs("myNFTs");
//   }
// }, [currentAccount]);

useEffect(() => {
  loadAuthorNFTs();
}, [currentAccount]);


  // -----------------------------
  // BUY NFT (createMarketSale)
  // -----------------------------
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = parseUnits(nft.price.toString(), "ether");

      // Your contract's createMarketSale(uint256 tokenId) payable
      // In solidity you have: createMarketSale(uint256 tokenId) public payable
      const transaction = await contract.createMarketSale(nft.tokenId, { 
        value: price 
      });

      await transaction.wait();
      console.log("Buyer:", currentAccount);
      console.log("NFT owner before refresh:", nft.owner);

      console.log("NFT Purchased!");
      router.refresh();
      router.push("/author-profile");
    } catch (error) {
      setError("Error while buying NFT:");
      setOpenError(true);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTS,
        nfts,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        myNFTs,
        listedNFTs,
        loadAuthorNFTs,
        setOpenError,
        openError,
        error,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};


