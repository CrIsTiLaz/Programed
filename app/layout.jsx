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
