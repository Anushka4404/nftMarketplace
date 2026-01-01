"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar, BiFontSize } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTTabs } from "../NFTDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { useSearchParams } from "next/navigation";
import { BrowserProvider, Contract } from "ethers";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "../../Context/constants";


const NFTDescription = ({ nft }) => {
  
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [realOwner, setRealOwner] = useState(null);
  const [justBought, setJustBought] = useState(false);


  const router = useRouter();

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };

  //SMART CONTRACT DATA
  const { buyNFT, currentAccount, nfts } = useContext(NFTMarketplaceContext);
  const searchParams = useSearchParams();

  // 🔥 get tokenId from URL
  const tokenId = Number(searchParams.get("tokenId"));
  
  useEffect(() => {
  const fetchRealOwner = async () => {
    try {
      if (!tokenId || !window.ethereum) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        provider
      );

      const item = await contract.fetchMarketItem(tokenId);
      setRealOwner(item.owner.toLowerCase());

      console.log("REAL OWNER FROM CHAIN:", item.owner);
    } catch (error) {
      console.log("Error fetching owner:", error);
    }
  };

  fetchRealOwner();
}, [tokenId]);


  // 🔥 get LIVE nft from context (this updates after buy)
  const liveNFT = nfts.find((item) => item.tokenId === tokenId);

  // fallback (page refresh safety)
  const finalNFT = liveNFT || nft;

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="#">
                  <MdReportProblem /> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {nft.name} #{nft.tokenId}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href ={{pathname: "/author-profile", query: `${nft.seller}`}}>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={images.creatorbackground1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Collection</small> <br />
                <span>
                  Our Trio <MdVerified />
                </span>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>2</p>
                <span>Days</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>22</p>
                <span>hours</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>45</p>
                <span>mins</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>12</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Bid</small>
                <p>
                  {nft.price} ETH <span>( ≈ $3,221.22)</span>
                </p>
              </div>

              <span>[96 in stock]</span>
            </div>

            {/* <div className={Style.NFTDescription_box_profile_biding_box_button}>

              {currentAccount === nft.seller.toLowerCase() ? (
                <p>
                  You cannot buy your own NFT
                </p>
              ) : currentAccount == nft.owner.toLowerCase() ? (
                <Button
                icon=<FaWallet />
                btnName="List on Marketplace"
                handleClick={() => {}}
                classStyle={Style.button}
              />
              ) : (
                <Button
                icon=<FaWallet />
                btnName="Buy NFT"
                handleClick={() => buyNFT(nft)}
                classStyle={Style.button}
              />
              )}
              
              <Button
                icon=<FaPercentage />
                btnName="Make offer"
                handleClick={() => {}}
                classStyle={Style.button}
              />
            </div> */}

           <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {(() => {
                const ZERO = "0x0000000000000000000000000000000000000000";

                const c = currentAccount?.toLowerCase();
                // const seller = nft?.seller?.toLowerCase() || ZERO;
                // const owner = nft?.owner?.toLowerCase() || ZERO;
                const seller = finalNFT?.seller?.toLowerCase() || ZERO;
                // const owner = finalNFT?.owner?.toLowerCase() || ZERO;
                const owner = realOwner || finalNFT?.owner?.toLowerCase() || ZERO;



                if (!c) return <p>Loading...</p>;

                if (seller !== ZERO && c === seller) {
                  return <p>You cannot buy your own NFT</p>;
                }

                if (c === owner) {
                  return (
                    <Button
                      icon={<FaWallet />}
                      btnName="List on Marketplace"
                      handleClick={() =>
                        // router.push(`/resellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
                        router.push(`/resellToken?id=${finalNFT.tokenId}&tokenURI=${finalNFT.tokenURI}`)
                      }
                      classStyle={Style.button}
                    />
                  );
                }

                return (
                  <Button
                    // icon={<FaWallet />}
                    // btnName="Buy NFT"
                    // // handleClick={() => buyNFT(nft)}
                    // handleClick={() => buyNFT(finalNFT)}
                    // classStyle={Style.button}
                     icon={<FaWallet />}
                      btnName={justBought ? "List on Marketplace" : "Buy NFT"}
                      handleClick={async () => {
                        if (!justBought) {
                          await buyNFT(finalNFT);   // wait for purchase
                          setJustBought(true);      // 🔥 change button text
                        } else {
                          router.push(
                            `/resellToken?id=${finalNFT.tokenId}&tokenURI=${finalNFT.tokenURI}`
                          );
                        }
                      }}
                    classStyle={Style.button}
                  />
                );
              })()}

              <Button
                icon={<FaPercentage />}
                btnName="Make offer"
                handleClick={() => {}}
                classStyle={Style.button}
              />
            </div>



            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provanance</button>
              <button onClick={() => openOwmer()}>Owner</button>
            </div>

            {history && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={historyArray} />
              </div>
            )}
            {provanance && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon=<MdVerified /> />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;