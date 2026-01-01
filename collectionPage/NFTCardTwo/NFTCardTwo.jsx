// "use client"
// import React, { useState } from "react";
// import Image from "next/image";
// import { BsImage } from "react-icons/bs";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { MdVerified, MdTimer } from "react-icons/md";
// import Link from "next/link";

// //INTERNAL IMPORT
// import Style from "./NFTCardTwo.module.css";
// import { LikeProfile } from "../../components/componentsindex";

// const NFTCardTwo = ({ NFTData }) => {
//   const [like, setLike] = useState(false);
//   const [likeInc, setLikeInc] = useState(21);

//   const likeNFT = () => {
//     if (!like) {
//       setLike(true);
//       setLikeInc(23);
//     } else {
//       setLike(false);
//       setLikeInc(23 + 1);
//     }
//   };

//   return (
//     <div className={Style.NFTCardTwo}> 
//       {NFTData.map((el, i) => (
//         // 
//         <Link
//           href={{
//             pathname: "/NFT-details",
//             query: {
//               image: el.image,
//               name: el.name,
//               price: el.price,
//               seller: el.seller,
//               tokenId: el.tokenId,
//               description: el.description,
//             },
//           }}
//           key={i}
//         >

//         <div className={Style.NFTCardTwo_box} key={i + 1}>
//           <div className={Style.NFTCardTwo_box_like}>
//             <div className={Style.NFTCardTwo_box_like_box}>
//               <div className={Style.NFTCardTwo_box_like_box_box}>
//                 <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
//                 <p onClick={() => likeNFT()}>
//                   {like ? <AiOutlineHeart /> : <AiFillHeart />}
//                   {""}
//                   <span>{likeInc + 1}</span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className={Style.NFTCardTwo_box_img}>
//             <Image
//               src={el.image}
//               alt="NFT"
//               width={250}
//               height={250}
//               style={{ objectFit: "cover" }}
//               className={Style.NFTCardTwo_box_img_img}
//             />
//           </div>

//           <div className={Style.NFTCardTwo_box_info}>
//             <div className={Style.NFTCardTwo_box_info_left}>
//               <LikeProfile />
//               <p>{el.name}</p>
//             </div>
//             <small>4{i + 2}</small>
//           </div>

//           <div className={Style.NFTCardTwo_box_price}>
//             <div className={Style.NFTCardTwo_box_price_box}>
//               <small>Current Bid</small>
//               <p>{el.price} ETH</p>
//             </div>
//             <p className={Style.NFTCardTwo_box_price_stock}>
//               <MdTimer /> <span>{i + 1} hours left</span>
//             </p>
//           </div>
//         </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default NFTCardTwo;


"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../components/componentsindex";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);

  useEffect(() => {
    console.log("🔥 NFTCardTwo received NFTData:", NFTData);
  }, [NFTData]);

  // Handle empty or undefined data
  if (!NFTData) {
    console.log("❌ ERROR: NFTData is undefined!");
    return <p style={{ color: "red" }}>NFTData undefined</p>;
  }

  if (!Array.isArray(NFTData)) {
    console.log("❌ ERROR: NFTData is NOT an array:", NFTData);
    return <p style={{ color: "red" }}>NFTData not an array</p>;
  }

  if (NFTData.length === 0) {
    console.log("⚠️ NFTData ARRAY IS EMPTY");
    return <p style={{ color: "orange" }}>No NFTs available</p>;
  }

  const likeNFT = () => {
    setLike(!like);
    setLikeInc((prev) => prev + 1);
  };

  return (
    <div className={Style.NFTCardTwo}>
      {NFTData.map((el, i) => (
        <Link
          href={{
            pathname: "/NFT-details",
            query: {
              image: el.image,
              name: el.name,
              price: el.price,
              seller: el.seller,
              tokenId: el.tokenId,
              description: el.description,
            },
          }}
          key={i}
        >
          <div className={Style.NFTCardTwo_box}>
            <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
                <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                <p onClick={likeNFT}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  <span>{likeInc}</span>
                </p>
              </div>
            </div>

            <div className={Style.NFTCardTwo_box_img}>
              <Image
                src={el.image}
                alt="NFT"
                width={250}
                height={250}
                style={{ objectFit: "cover" }}
                className={Style.NFTCardTwo_box_img_img}
              />
            </div>

            <div className={Style.NFTCardTwo_box_info}>
              <div className={Style.NFTCardTwo_box_info_left}>
                <LikeProfile />
                <p>{el.name}</p>
              </div>
              <small>4{i + 2}</small>
            </div>

            <div className={Style.NFTCardTwo_box_price}>
              <div className={Style.NFTCardTwo_box_price_box}>
                <small>Current Bid</small>
                <p>{el.price} ETH</p>
              </div>
              <p className={Style.NFTCardTwo_box_price_stock}>
                <MdTimer /> <span>{i + 1} hours left</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
