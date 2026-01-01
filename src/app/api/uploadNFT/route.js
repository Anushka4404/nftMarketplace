export const runtime = "nodejs";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_KEY
);

// async function webReadableToNodeReadable(webStream) {
//   // Node v18+: Readable.fromWeb exists
//   if (Readable.fromWeb) {
//     return Readable.fromWeb(webStream);
//   }
//   // Fallback: consume the web stream into a Buffer and return Readable.from(buffer)
//   const reader = webStream.getReader();
//   const chunks = [];
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     chunks.push(Buffer.from(value));
//   }
//   return Readable.from(Buffer.concat(chunks));
// }

export async function POST(req) {
  try {
    console.log("API KEY:", process.env.PINATA_API_KEY ? "YES" : "NO");
    console.log("SECRET:", process.env.PINATA_SECRET_KEY ? "YES" : "NO");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) throw new Error("No file uploaded");
    
    console.log("Received file:", file.name, file.type);

    // const webStream = file.stream();
    // const nodeStream = await webReadableToNodeReadable(webStream);


    // const options = {
    //   pinataMetadata: {
    //     name: file.name || "upload",
    //   },
    //   pinataOptions: {
    //     cidVersion: 1,
    //   },
    // };
    // const result = await pinata.pinFileToIPFS(nodeStream, options);

    // if (!result || !result.IpfsHash) throw new Error("Pinata returned no IpfsHash");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stream = Readable.from(buffer);

    // Make sure metadata JSON is handled correctly
    const metadataName =
      file.type === "application/json" ? "metadata.json" : file.name;

    const result = await pinata.pinFileToIPFS(stream, {
     // pinataMetadata: { name: file.name || "upload" },
     pinataMetadata: { name: metadataName },
      pinataOptions: { cidVersion: 1 }
    });

     if (!result?.IpfsHash) {
      throw new Error("Pinata did not return IpfsHash");
    }
    
    const url = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    console.log("Pinned to IPFS:", url);

    return new Response(JSON.stringify({ url }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
     });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json"}
    });
  }
}





//     // Convert File to Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Convert buffer to readable stream
//     const stream = Readable.from(buffer);

//     // Upload to Pinata using stream
//     const result = await pinata.pinFileToIPFS(stream, {
//       pinataMetadata: { name: file.name },
//     });

//     const url = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;

//     return new Response(JSON.stringify({ url }), { status: 200 });
//   } catch (error) {
//     console.log("SERVER ERROR:", error.message);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


