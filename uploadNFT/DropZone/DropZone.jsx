// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";

// //INTRNAL IMPORT
// import Style from "./DropZone.module.css";
// import images from "../../img";

// const DropZone = ({
//   title,
//   heading,
//   subHeading,
//   name,
//   website,
//   description,
//   royalties,
//   fileSize,
//   category,
//   properties,
//   image,
// }) => {
//   const [fileUrl, setFileUrl] = useState(null);

//   const onDrop = useCallback(async (acceptedFile) => {
//     setFileUrl(acceptedFile[0]);
//   });

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "image/*",
//     maxSize: 5000000,
//   });
//   return (
//     <div className={Style.DropZone}>
//       <div className={Style.DropZone_box} {...getRootProps()}>
//         <input {...getInputProps()} />
//         <div className={Style.DropZone_box_input}>
//           <p>{title}</p>
//           {/* <div className={Style.DropZone_box_input_img}>
//             <Image
//               src={image}
//               alt="upload"
//               width={100}
//               height={100}
//               objectFit="contain"
//               className={Style.DropZone_box_input_img_img}
//             />
//           </div> */}

//           <div className={Style.DropZone_box_input_img}>
//               {image ? (
//                 <Image
//                   src={image}
//                   alt="upload"
//                   width={100}
//                   height={100}
//                   className={Style.DropZone_box_input_img_img}
//                 />
//               ) : (
//                 <div style={{ fontSize: "12px", opacity: 0.7 }}>No image</div>
//               )}
//             </div>

//           <p>{heading}</p>
//           <p>{subHeading}</p>
//         </div>
//       </div>

//       {fileUrl && (
//         <aside className={Style.DropZone_box_aside}>
//           <div className={Style.DropZone_box_aside_box}>
//             <Image
//               src={images.nft_image_1}
//               alt="nft image"
//               width={200}
//               height={200}
//             />

//             <div className={Style.DropZone_box_aside_box_preview}>
//               <div className={Style.DropZone_box_aside_box_preview_one}>
//                 <p>
//                   <samp>NFT Name:</samp>
//                   {itemName || ""}
//                 </p>
//                 <p>
//                   <samp>Website:</samp>
//                   {website || ""}
//                 </p>
//               </div>

//               <div className={Style.DropZone_box_aside_box_preview_two}>
//                 <p>
//                   <span>Description</span>
//                   {description || ""}
//                 </p>
//               </div>

//               <div className={Style.DropZone_box_aside_box_preview_three}>
//                 <p>
//                   <span>Royalties</span>
//                   {royalties || ""}
//                 </p>
//                 <p>
//                   <span>FileSize</span>
//                   {fileSize || ""}
//                 </p>
//                 <p>
//                   <span>Properties</span>
//                   {properties || ""}
//                 </p>
//                 <p>
//                   <span>Category</span>
//                   {category || ""}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </aside>
//       )}
//     </div>
//   );
// };

// export default DropZone;





// "use client";
// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";

// //INTERNAL IMPORT
// import Style from "./DropZone.module.css";
// import images from "../../img";

// const DropZone = ({
//   title,
//   heading,
//   subHeading,
//   name,
//   website,
//   description,
//   royalties,
//   fileSize,
//   category,
//   properties,
//   uploadToIPFS,
//   setImage
// }) => {
//   const [fileUrl, setFileUrl] = useState(null);

//   // const onDrop = useCallback(async (acceptedFile) => {
//   //   const url = await uploadToIPFS(acceptedFile[0]);
//   //   setFileUrl(url);
//   //   setImage(url);
//   // });

//   const onDrop = useCallback(async (acceptedFile) => {
//   try {
//     const url = await uploadToIPFS(acceptedFile[0]);
//     setFileUrl(url);
//     setImage(url);
//     console.log(url);
//   } catch (error) {
//     console.error("IPFS upload failed:", error);
//   }
// }, [uploadToIPFS, setImage]);


//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "image/*",
//     maxSize: 5000000,
//   });

//   return (
//     <div className={Style.DropZone}>
//       <div className={Style.DropZone_box} {...getRootProps()}>
//         <input {...getInputProps()} />

//         <div className={Style.DropZone_box_input}>
//           <p>{title}</p>

//           <div className={Style.DropZone_box_input_img}>
//             {/* {images ? (
//               <Image
//                 src={images.upload}
//                 alt="upload"
//                 width={100}
//                 height={100}
//                 className={Style.DropZone_box_input_img_img}
//               />
//             ) : (
//               <div style={{ fontSize: "12px", opacity: 0.7 }}>No image</div>
//             )} */}
//             {fileUrl ? (
//               <Image
//                 src={fileUrl}
//                 alt="Selected NFT"
//                 width={100}
//                 height={100}
//                 className={Style.DropZone_box_input_img_img}
//               />
//             ) : (
//               <div style={{ fontSize: "12px", opacity: 0.7 }}>No image</div>
//             )}

//           </div>

//           <p>{heading}</p>
//           <p>{subHeading}</p>
//         </div>
//       </div>

//       {fileUrl && (
//         <aside className={Style.DropZone_box_aside}>
//           <div className={Style.DropZone_box_aside_box}>

//             <Image
//               src={fileUrl}
//               alt="nft image"
//               width={200}
//               height={200}
//             />

//             <div className={Style.DropZone_box_aside_box_preview}>
//               <div className={Style.DropZone_box_aside_box_preview_one}>
//                 <p>
//                   <samp>NFT Name:</samp> {name || ""}
//                 </p>
//                 <p>
//                   <samp>Website:</samp> {website || ""}
//                 </p>
//               </div>

//               <div className={Style.DropZone_box_aside_box_preview_two}>
//                 <p>
//                   <span>Description</span> {description || ""}
//                 </p>
//               </div>

//               <div className={Style.DropZone_box_aside_box_preview_three}>
//                 <p>
//                   <span>Royalties</span> {royalties || ""}
//                 </p>
//                 <p>
//                   <span>FileSize</span> {fileSize || ""}
//                 </p>
//                 <p>
//                   <span>Properties</span> {properties || ""}
//                 </p>
//                 <p>
//                   <span>Category</span> {category || ""}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </aside>
//       )}
//     </div>
//   );
// };

// export default DropZone;




"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  royalties,
  fileSize,
  category,
  properties,
  uploadToIPFS,
  setImage,        // <-- this must receive File, not URL
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);   // <-- ADDED

  const onDrop = useCallback(
    async (acceptedFile) => {
      try {
        const selected = acceptedFile[0];
        if (!selected) return;

        // 1️⃣ STORE REAL FILE → this will be used in createNFT()
        setFile(selected);          
        setImage(selected);
        // 2️⃣ SHOW PREVIEW ONLY (URL.createObjectURL) - Don't upload yet!
        const preview = URL.createObjectURL(selected);
        setFileUrl(preview);

        // Note: File upload to IPFS will happen when user clicks "Upload" button
        // This just stores the file and shows a preview

      } catch (error) {
        console.error("Error handling file:", error);
        alert("Error loading file. Please try again.");
      }
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />

        <div className={Style.DropZone_box_input}>
          <p>{title}</p>

          <div className={Style.DropZone_box_input_img}>
            {fileUrl ? (
              <Image
                src={fileUrl}
                alt="Selected NFT"
                width={100}
                height={100}
                className={Style.DropZone_box_input_img_img}
              />
            ) : (
              <div style={{ fontSize: "12px", opacity: 0.7 }}>No image</div>
            )}
          </div>

          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image src={fileUrl} alt="nft image" width={200} height={200} />

            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p>
                  <samp>NFT Name:</samp> {name || ""}
                </p>
                <p>
                  <samp>Website:</samp> {website || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description</span> {description || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties</span> {royalties || ""}
                </p>
                <p>
                  <span>FileSize</span> {fileSize || ""}
                </p>
                <p>
                  <span>Properties</span> {properties || ""}
                </p>
                <p>
                  <span>Category</span> {category || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
