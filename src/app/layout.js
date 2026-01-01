"use client";
import "./globals.css";
import { NavBar, Footer, HeroSection } from "../../components/componentsindex";
//import { NFTMarketplaceProvider } from "../../Context/NFTMarketplaceContext";
import Providers from "./providers";
// Note: metadata export is not allowed in client components
// If you need metadata, create a separate metadata file or use next/head

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {/* <HeroSection /> */}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

