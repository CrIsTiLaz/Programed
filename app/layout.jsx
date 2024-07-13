"use client";
import { Inter, Raleway } from "next/font/google";
import "../styles/global.css";
import Provider from "./Provider";
import { useState } from "react";
import Footer from "./(components)/footer/Footer"; // Asumând că globals.css se află în directorul styles
import Header from "./(components)/header/header";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import { RecoveryContext } from "./context/RecoveryContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import BetaMessage from "./utils/BetaMessage";
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
              <BetaMessage />
              {children}
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #e0e0e0",
                  margin: 0,
                  padding: 0,
                }}
              />

              <Footer />
            </RecoveryContext.Provider>
          </AuthContextProvider>
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-HCTMWZ9HJS" />
    </html>
  );
}
