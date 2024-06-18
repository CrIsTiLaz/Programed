"use client";
import { Inter, Raleway } from "next/font/google";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";
import "../styles/global.css";
import Provider from "./Provider";
import HeaderPage from "./(components)/header/page";
import { Suspense, useEffect, useState } from "react";
import { UserLocationContext } from "./context/UserLocationContext";
import { SelectedBusinessContext } from "./context/SelectedBusinessContext";
import Footer from "./(components)/footer/Footer";
import "../styles/global.css";
import "../styles/global.css"; // Asumând că globals.css se află în directorul styles
import Header from "./(components)/header/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import { RecoveryContext } from "./context/RecoveryContext";

const raleway = Raleway({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const SEO = () => (
  <>
    <NextSeo
      description="Islem Maboud Portfolio"
      openGraph={{
        images: [
          {
            url: "http://islemmaboud.com/static/home-image-preview.jpg",
            width: 1200,
            height: 638,
            alt: "Islem Maboud Blog",
            type: "image/jpg",
            secureUrl: "https://islemmaboud.com/static/home-image-preview.jpg",
          },
        ],
      }}
    />
    <SocialProfileJsonLd
      type="Person"
      name="Islem Maboud"
      url="https://islemmaboud.com"
      sameAs={[
        "https://twitter.com/@Ipenywis",
        "https://instagram.com/islem.coderone",
        "https://www.linkedin.com/in/islem-maboud",
        "https://github.com/Ipenywis",
      ]}
    />
  </>
);

export default function RootLayout({ children }) {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AuthContextProvider>
            <RecoveryContext.Provider
              value={{ page, setPage, otp, setOTP, setEmail, email }}
            >
              <Header />
              {children}
              <Footer />
              <ToastContainer
                theme="dark"
                position="top-right"
                autoClose={3000}
                closeOnClick
                pauseOnHover={false}
              />
            </RecoveryContext.Provider>
          </AuthContextProvider>
        </Provider>
      </body>
    </html>
  );
}
