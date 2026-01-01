// "use client";
// import React, { useState } from "react";

// //INTERNAL IMPORT
// import Style from "./AuthorNFTCardBox.module.css";
// import images from "../../img";
// import { NFTCardTwo } from "../../collectionPage/collectionIndex";
// import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";

// const AuthorNFTCardBox = ({
//   collectiables,
//   created,
//   like,
//   follower,
//   following,
//   nfts,
//   myNFTs,
// }) => {
//   // 🔍 DEBUG LOGS
//   console.log("🔥 AuthorNFTCardBox Props Received:");
//   console.log("➡ collectiables:", collectiables);
//   console.log("➡ created:", created);
//   console.log("➡ like:", like);
//   console.log("➡ follower:", follower);
//   console.log("➡ following:", following);
//   console.log("➡ nfts (collectibles data):", nfts);
//   console.log("➡ myNFTs (created data):", myNFTs);
//   // const collectiablesArray = [
//   //   images.nft_image_1,
//   //   images.nft_image_2,
//   //   images.nft_image_3,
//   //   images.nft_image_1,
//   //   images.nft_image_2,
//   //   images.nft_image_3,
//   //   images.nft_image_1,
//   //   images.nft_image_2,
//   // ];

//   // const createdArray = [
//   //   images.nft_image_1,
//   //   images.nft_image_2,
//   //   images.nft_image_3,
//   //   images.nft_image_1,
//   // ];

//   const likeArray = [
//     images.nft_image_1,
//     images.nft_image_2,
//     images.nft_image_3,
//     images.nft_image_1,
//     images.nft_image_2,
//   ];

//   const followerArray = [
//     {
//       background: images.creatorbackground1,
//       user: images.user1,
//     },
//     {
//       background: images.creatorbackground2,
//       user: images.user2,
//     },
//     {
//       background: images.creatorbackground3,
//       user: images.user3,
//     },
//     {
//       background: images.creatorbackground4,
//       user: images.user4,
//     },
//     {
//       background: images.creatorbackground5,
//       user: images.user5,
//     },
//     {
//       background: images.creatorbackground6,
//       user: images.user6,
//     },
//   ];

//   const followingArray = [
//     {
//       background: images.creatorbackground3,
//       user: images.user3,
//     },
//     {
//       background: images.creatorbackground4,
//       user: images.user4,
//     },
//     {
//       background: images.creatorbackground5,
//       user: images.user5,
//     },
//     {
//       background: images.creatorbackground6,
//       user: images.user6,
//     },
//     {
//       background: images.creatorbackground1,
//       user: images.user1,
//     },
//   ];
//   return (
//     <div className={Style.AuthorNFTCardBox}>
//       {collectiables && (<>
//       {console.log("📦 Rendering collectiables → NFTData:", nfts)}
//       <NFTCardTwo NFTData={nfts} />
//       </>
//     )}

//       {created && 
//        (
//         <>
//           {console.log("📦 Rendering created → myNFTs:", myNFTs)}
//           <NFTCardTwo NFTData={myNFTs} />
//         </>
//         )}
//       {like && <NFTCardTwo NFTData={likeArray} />}
//       {follower && (
//         <div className={Style.AuthorNFTCardBox_box}>
//           {followerArray.map((el, i) => (
//             <FollowerTabCard key={i} i={i} el={el} />
//           ))}
//         </div>
//       )}
//       {following && (
//         <div className={Style.AuthorNFTCardBox_box}>
//           {followingArray.map((el, i) => (
//             <FollowerTabCard key={i} i={i} el={el} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthorNFTCardBox;

"use client";
import React from "react";

// INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
  nfts,
  myNFTs,
}) => {
  // // 🔍 DEBUG LOGS
  // console.log("🔥 AuthorNFTCardBox Props Received:");
  // console.log("➡ collectiables:", collectiables);
  // console.log("➡ created:", created);
  // console.log("➡ like:", like);
  // console.log("➡ follower:", follower);
  // console.log("➡ following:", following);
  // console.log("➡ nfts (collectibles data):", nfts);
  // console.log("➡ myNFTs (created data):", myNFTs);

  // const likeArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  const followerArray = [
    { 
      background: images.creatorbackground1, 
      user: images.user1,
      seller: "dfdfschb8989807565yuyumufo",
    },
    { 
      background: images.creatorbackground2, 
      user: images.user2 ,
      seller: "dfdfschb8989807565yuyumufo",
    },
    { 
      background: images.creatorbackground3, 
      user: images.user3,
      seller: "dfdfschb8989807565yuyumufo",
    },
    { 
      background: images.creatorbackground4, 
      user: images.user4,
      seller: "dfdfschb8989807565yuyumufo",
    },
    { 
      background: images.creatorbackground5, 
      user: images.user5,
      seller: "dfdfschb8989807565yuyumufo",
    },
    { 
      background: images.creatorbackground6, 
      user: images.user6,
      seller: "dfdfschb8989807565yuyumufo",
    },
  ];

  const followingArray = [
    { background: images.creatorbackground3, user: images.user3 },
    { background: images.creatorbackground4, user: images.user4 },
    { background: images.creatorbackground5, user: images.user5 },
    { background: images.creatorbackground6, user: images.user6 },
    { background: images.creatorbackground1, user: images.user1 },
  ];

  return (
    <div className={Style.AuthorNFTCardBox}>

      {collectiables && (
        <>
          {console.log("📦 Rendering collectiables → NFTData:", nfts)}
          <NFTCardTwo NFTData={nfts} />
        </>
      )}

      {created && (
        <>
          {console.log("📦 Rendering created → myNFTs:", myNFTs)}
          <NFTCardTwo NFTData={myNFTs} />
        </>
      )}

      {like && (
        <>
         
          <NFTCardTwo NFTData={nfts} />
        </>
      )}

      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard key={i} i={i} el={el} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard key={i} i={i} el={el} />
          ))}
        </div>
      )}

    </div>
  );
};

export default AuthorNFTCardBox;
